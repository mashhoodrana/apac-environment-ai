import subprocess
import os
import sys
import platform

def check_python_version():
    """Check if Python version is 3.10 or higher"""
    if sys.version_info < (3, 10):
        print("Python 3.10 or higher is required!")
        return False
    return True

def create_venv():
    """Create a virtual environment"""
    if not os.path.exists("venv"):
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"])
    else:
        print("Virtual environment already exists")

def install_backend_deps():
    """Install backend dependencies"""
    print("Installing backend dependencies...")
    
    # Determine the virtual environment activation script
    if platform.system() == "Windows":
        activate_script = os.path.join("venv", "Scripts", "activate")
        pip_cmd = os.path.join("venv", "Scripts", "pip")
    else:
        activate_script = os.path.join("venv", "bin", "activate")
        pip_cmd = os.path.join("venv", "bin", "pip")
    
    # Install requirements
    if platform.system() == "Windows":
        # Windows needs a different approach for venv activation in subprocess
        subprocess.run(f'"{pip_cmd}" install -r requirements.txt', shell=True)
    else:
        subprocess.run(f"source {activate_script} && pip install -r requirements.txt", shell=True)

def setup_frontend():
    """Setup the frontend"""
    if os.path.exists(os.path.join("FrontEnd", "node_modules")):
        print("Frontend dependencies already installed")
        return
    
    print("Installing frontend dependencies...")
    os.chdir("FrontEnd")
    # Run npm install
    subprocess.run(["npm", "install"], check=True)
    os.chdir("..")

def main():
    """Main setup function"""
    print("Environmental Analysis Platform - Development Setup")
    print("=================================================")
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Create virtual environment
    create_venv()
    
    # Install backend dependencies
    install_backend_deps()
    
    # Setup frontend
    try:
        setup_frontend()
    except (subprocess.SubprocessError, FileNotFoundError) as e:
        print(f"Error setting up frontend: {e}")
        print("Please make sure Node.js is installed and available in your PATH")
    
    print("\nSetup complete!")
    print("To run the backend:")
    if platform.system() == "Windows":
        print("  venv\\Scripts\\activate")
    else:
        print("  source venv/bin/activate")
    print("  uvicorn app.main:app --reload")
    print("\nTo run the frontend:")
    print("  cd FrontEnd")
    print("  npm start")

if __name__ == "__main__":
    main() 