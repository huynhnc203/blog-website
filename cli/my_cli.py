import click

@click.group()
def cli():
    pass

@cli.command()
def runserver():
    """Run the Flask server."""
    from subprocess import Popen
    Popen(['flask', 'run'], cwd='../back-end', shell=True)

@cli.command()
def build():
    """Build the React frontend."""
    from subprocess import run
    run(['npm', 'run', 'build'], cwd='../front-end', shell=True)

if __name__ == '__main__':
    cli()
