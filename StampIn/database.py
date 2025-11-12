from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class AttendanceRecord(db.Model):
    """Model for storing attendance records"""
    __tablename__ = 'attendance_records'
    
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    section = db.Column(db.String(100), nullable=False)
    professor = db.Column(db.String(100), nullable=False)
    student = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    
    def to_dict(self):
        """Convert record to dictionary"""
        return {
            'id': self.id,
            'timestamp': self.timestamp,
            'date': self.date,
            'time': self.time,
            'section': self.section,
            'professor': self.professor,
            'student': self.student,
            'status': self.status
        }
    
    def __repr__(self):
        return f'<AttendanceRecord {self.student} - {self.status}>'