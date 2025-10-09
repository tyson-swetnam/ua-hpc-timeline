#!/usr/bin/env python3
"""
Simple HTTP server for viewing the UA HPC Timeline visualizations
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(MyHTTPRequestHandler, self).end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 Server running at http://localhost:{PORT}")
    print(f"📊 View the UA HPC Timeline at: http://localhost:{PORT}/index.html")
    print("Press Ctrl+C to stop the server")

    # Optionally open browser automatically
    # webbrowser.open(f'http://localhost:{PORT}')

    httpd.serve_forever()