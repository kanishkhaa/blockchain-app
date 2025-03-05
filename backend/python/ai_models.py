from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
import sys

app = Flask(__name__)
CORS(app)

@app.route('/api/trade', methods=['POST'])
def process_trade():
    try:
        # Get trade data from the frontend
        trade_data = request.json
        
        # Validate required fields
        required_fields = ['tradingPair', 'investmentAmount']
        for field in required_fields:
            if field not in trade_data or not trade_data[field]:
                return jsonify({
                    'status': 'error', 
                    'message': f'Missing required field: {field}'
                }), 400

        # Convert data to JSON string for passing to Node.js script
        trade_data_json = json.dumps(trade_data)
        
        # Path to the Node.js AI trading script
        script_path = os.path.join(os.path.dirname(__file__), 'ai_model.js')
        
        # Execute the Node.js script with trade data
        result = subprocess.run(
            ['node', script_path, trade_data_json], 
            capture_output=True, 
            text=True
        )
        
        # Print full stdout and stderr for debugging
        print("Full stdout:", result.stdout)
        print("Full stderr:", result.stderr)
        
        # Find the JSON output by looking for the last JSON-like output
        json_output = None
        for line in reversed(result.stdout.splitlines()):
            try:
                json_output = json.loads(line)
                break
            except json.JSONDecodeError:
                continue
        
        if json_output is None:
            print("No valid JSON output found")
            return jsonify({
                'status': 'error',
                'message': 'Failed to parse AI trading script output'
            }), 500
        
        # Process the JSON output
        if json_output.get('status') == 'success':
            return jsonify(json_output), 200
        else:
            return jsonify({
                'status': 'error',
                'message': json_output.get('message', 'Unknown error occurred')
            }), 500
    
    except Exception as e:
        # Log the full exception details
        print("Exception occurred:", str(e))
        print("Exception type:", type(e))
        import traceback
        traceback.print_exc()
        
        return jsonify({
            'status': 'error', 
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)