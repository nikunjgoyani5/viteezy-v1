#!/usr/bin/env python3
"""
System diagnostics to identify issues
"""
import sys
import os
from pathlib import Path

# Add project to path
sys.path.insert(0, r'C:\projects\order-pdf-processing\order-pdf-processing')
os.environ['VOP_DATA_DIR'] = r'C:\projects\order-pdf-processing\order-pdf-processing\data'

def diagnose_system():
    """Run system diagnostics"""
    print("=" * 60)
    print("SYSTEM DIAGNOSTICS")
    print("=" * 60)
    
    # Basic Python info
    print(f"Python version: {sys.version}")
    print(f"Python executable: {sys.executable}")
    
    # Project structure
    try:
        from vop.processing import _load_dotenv
        from vop import dirs
        _load_dotenv()
        
        print(f"\nData directory: {dirs.data_dir}")
        print(f"Data dir exists: {dirs.data_dir.exists()}")
        
        # Check essential files
        config_path = dirs.data_dir / "config.yaml"
        template_path = dirs.template_dir / "template.docx"
        inventory_path = dirs.data_dir / "inventory.yaml"
        
        print(f"Config file exists: {config_path.exists()}")
        print(f"Template file exists: {template_path.exists()}")
        print(f"Inventory file exists: {inventory_path.exists()}")
        print(f"Images dir exists: {dirs.img_dir.exists()}")
        print(f"Output dir exists: {dirs.out_dir.exists()}")
        
        # Environment variables
        print(f"\nSTRAPI_HOST: {os.environ.get('STRAPI_HOST', 'Not set')}")
        print(f"STRAPI_TOKEN: {'Set' if os.environ.get('STRAPI_ACCESS_TOKEN') else 'Not set'}")
        print(f"DATABASE_HOST: {os.environ.get('DATABASE_HOST', 'Not set')}")
        
        # Check images
        if dirs.img_dir.exists():
            image_files = list(dirs.img_dir.glob("*.png"))
            print(f"Image files found: {len(image_files)}")
            if image_files:
                print("Sample images:")
                for img in image_files[:5]:
                    print(f"  - {img.name}")
        
        # Test imports
        print(f"\nTesting imports...")
        try:
            import pandas
            print("  [OK] pandas")
        except ImportError as e:
            print(f"  [ERROR] pandas: {e}")
            
        try:
            import docxtpl
            print("  [OK] docxtpl")
        except ImportError as e:
            print(f"  [ERROR] docxtpl: {e}")
            
        try:
            import requests
            print("  [OK] requests")
        except ImportError as e:
            print(f"  [ERROR] requests: {e}")
            
        try:
            from PIL import Image
            print("  [OK] PIL (Pillow)")
        except ImportError as e:
            print(f"  [ERROR] PIL: {e}")
        
        # Test STRAPI connection
        print(f"\nTesting STRAPI connection...")
        try:
            import requests
            host = os.environ.get('STRAPI_HOST')
            token = os.environ.get('STRAPI_ACCESS_TOKEN')
            if host and token:
                url = host + "/strapi/api/productpages?populate=deep"
                headers = {"Authorization": "Bearer " + token}
                response = requests.get(url, headers=headers, timeout=5)
                print(f"  STRAPI status: {response.status_code}")
                if response.status_code == 200:
                    data = response.json().get('data', [])
                    print(f"  Products found: {len(data)}")
                else:
                    print(f"  STRAPI error: {response.text[:100]}")
            else:
                print("  STRAPI not configured")
        except Exception as e:
            print(f"  STRAPI error: {e}")
            
    except Exception as e:
        print(f"Error loading vop module: {e}")
        return
    
    print("\n" + "=" * 60)
    print("DIAGNOSTICS COMPLETE")
    print("=" * 60)

if __name__ == "__main__":
    diagnose_system()
