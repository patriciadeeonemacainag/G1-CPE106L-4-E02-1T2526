from flask import Flask, render_template, request, jsonify, send_file
from database import db, AttendanceRecord
from datetime import datetime
import pandas as pd
import io

import os

app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stampin.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Sample data
SECTIONS = {
    "CPE106-4_E02_1T2526": "Engr. Dionis Padilla",
    "CPE106L-4_E01_1T2526": "Engr. Erinn Chloe Sanchez"
}

STUDENTS = [
    "Evan Josh Landong",
    "Patricia Deeone Macainag",
    "Aethan Carlo Tabungar"
]

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    """Render main page"""
    return render_template('index.html', 
                         sections=SECTIONS, 
                         students=STUDENTS)

@app.route('/save-attendance', methods=['POST'])
def save_attendance():
    """Save attendance records to database"""
    try:
        data = request.json
        section = data['section']
        professor = SECTIONS[section]
        attendance_data = data['attendance']
        
        now = datetime.now()
        timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
        date = now.strftime("%Y-%m-%d")
        time_str = now.strftime("%H:%M:%S")
        
        saved_count = 0
        for student, status in attendance_data.items():
            record = AttendanceRecord(
                timestamp=timestamp,
                date=date,
                time=time_str,
                section=section,
                professor=professor,
                student=student,
                status=status
            )
            db.session.add(record)
            saved_count += 1
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'✓ Saved {saved_count} records at {time_str}',
            'timestamp': timestamp
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        }), 500

@app.route('/get-logs')
def get_logs():
    """Retrieve all attendance logs"""
    try:
        records = AttendanceRecord.query.order_by(
            AttendanceRecord.timestamp.desc()
        ).all()
        
        return jsonify({
            'success': True,
            'records': [record.to_dict() for record in records]
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/export-csv')
def export_csv():
    """Export attendance log as CSV"""
    try:
        records = AttendanceRecord.query.all()
        
        if not records:
            return jsonify({
                'success': False,
                'message': 'No records to export'
            }), 400
        
        # Convert to DataFrame
        data = [record.to_dict() for record in records]
        df = pd.DataFrame(data)
        
        # Create CSV in memory
        output = io.BytesIO()
        df.to_csv(output, index=False)
        output.seek(0)
        
        filename = f"StampIn_Attendance_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        
        return send_file(
            output,
            mimetype='text/csv',
            as_attachment=True,
            download_name=filename
        )
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/get-summary')
def get_summary():
    """Get attendance summary statistics"""
    try:
        records = AttendanceRecord.query.all()
        
        if not records:
            return jsonify({
                'success': True,
                'summary': None
            })
        
        # Calculate statistics
        df = pd.DataFrame([r.to_dict() for r in records])
        
        overall_status = df['status'].value_counts().to_dict()
        
        # Latest session
        latest_timestamp = df['timestamp'].max()
        latest_df = df[df['timestamp'] == latest_timestamp]
        latest_status = latest_df['status'].value_counts().to_dict()
        
        return jsonify({
            'success': True,
            'summary': {
                'total_records': len(records),
                'overall_status': overall_status,
                'latest_session': {
                    'timestamp': latest_timestamp,
                    'section': latest_df['section'].iloc[0],
                    'professor': latest_df['professor'].iloc[0],
                    'status': latest_status
                }
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)