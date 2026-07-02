import logging
from argparse import ArgumentParser
from pathlib import Path
from subprocess import CalledProcessError, check_output
from typing import List

#from sphinx_rtd_theme_github_versions import __version__


def report_output(stdout: bytes, label: str) -> List[str]:
    ret = stdout.decode().strip().split("\n")
    print(f"{label}: {ret}")
    return ret


def get_branch_contents(ref: str) -> List[str]:
    """Get the list of directories in a branch."""
    stdout = check_output(["git", "ls-tree", "-d", "--name-only", ref])
    return report_output(stdout, "Branch contents")


def get_sorted_tags_list() -> List[str]:
    """Get a list of sorted tags in descending order from the repository."""
    stdout = check_output(["git", "tag", "-l", "--sort=-v:refname"])
    return report_output(stdout, "Tags list")


def make_versions_file(directory: Path, remote: str, branch: str):
    """Generate the file containing the list of all GitHub Pages builds."""
    # Get the directories (i.e. builds) from the GitHub Pages branch
    try:
        builds = set(get_branch_contents(f"{remote}/{branch}"))
    except CalledProcessError:
        builds = set()
        logging.warning("Cannot get gh-pages branch contents")

    # Add in any directories we're about to publish
    for child in directory.iterdir():
        if child.is_dir():
            builds.add(child.name)
            print(f"Local directory: {child.name}")

    # Get a sorted list of tags
    tags = get_sorted_tags_list()

    # Make the sorted versions list from main branches and tags
    versions: List[str] = []
    for version in ["master", "main"] + tags:
        if version in builds:
            versions.append(version)
            builds.remove(version)

    # Add in anything that is left to the bottom
    versions += sorted(builds)
    print(f"Sorted versions: {versions}")

    # Write the versions file
    (directory / "versions.txt").write_text("\n".join(versions) + "\n")


def main(args=None):
    parser = ArgumentParser(
        description="Make a versions.txt file from gh-pages directories"
    )
    parser.add_argument("--version", action="version", version=__version__)
    parser.add_argument(
        "--remote", default="origin", help="Remote to get branch from, default origin"
    )
    parser.add_argument(
        "--branch",
        default="gh-pages",
        help="Branch to get built documentation from, default gh-pages",
    )
    parser.add_argument(
        "output",
        type=Path,
        help="Path of the directory to place versions.txt in. "
             "Subdirectories will also appear in versions.txt",
    )
    args = parser.parse_args(args)
    make_versions_file(args.output, args.remote, args.branch)


if __name__ == "__main__":
    main()
