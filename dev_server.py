#!/usr/bin/env python3
"""
Development server with no-cache headers for better development experience.
Run with: python dev_server.py
"""

import http.server
import socketserver
import os
from datetime import datetime

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add no-cache headers to prevent browser caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT')
        
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Add timestamp for debugging
        self.send_header('X-Served-At', datetime.now().isoformat())
        
        super().end_headers()
    
    def log_message(self, format, *args):
        # Enhanced logging with timestamps
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def run_server(port=3000):
    """Run the development server with no-cache headers"""
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        with socketserver.TCPServer(("", port), NoCacheHTTPRequestHandler) as httpd:
            print(f"🚀 Development Server Starting...")
            print(f"📂 Serving directory: {os.getcwd()}")
            print(f"🌐 Server running at: http://localhost:{port}")
            print(f"⚡ No-cache headers enabled for development")
            print(f"🔄 Press Ctrl+C to stop the server")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n⏹️  Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Try a different port or stop the existing server.")
            print(f"💡 Try: python dev_server.py --port 3001")
        else:
            print(f"❌ Server error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Development server with no-cache headers')
    parser.add_argument('--port', '-p', type=int, default=3000, 
                        help='Port to run the server on (default: 3000)')
    
    args = parser.parse_args()
    run_server(args.port)