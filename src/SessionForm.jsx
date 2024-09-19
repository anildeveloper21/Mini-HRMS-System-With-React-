// src/components/SessionForm.js
import React, { useEffect, useState } from 'react';
import './App.css'


const SessionForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        sessionDate: '',
        sessionTime: '',
        totalSessions: '',
        sessionInterval: '',
        preferredDays: '',
        durationPerSession: '',
        lastSessionDate: '',
        lastSessionTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const updateLastSessionDetails = () => {
        const { sessionDate, totalSessions, sessionInterval, durationPerSession } = formData;
        if (sessionDate && totalSessions) {
            const lastDate = new Date(sessionDate);
            const interval = parseInt(sessionInterval, 10) || 0; // Parse interval, default to 0 if invalid
            const duration = parseInt(durationPerSession, 10) || 0; // Parse duration, default to 0 if invalid
            
            // Calculate last session date
            lastDate.setDate(lastDate.getDate() + (totalSessions - 1) * interval); // Adjust for total sessions and interval
            
            // Set the last session date
            const lastSessionDate = lastDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

            const sessionTimeParts = formData.sessionTime.split(':');
            const sessionHours = parseInt(sessionTimeParts[0], 10);
            const sessionMinutes = parseInt(sessionTimeParts[1], 10);
            const totalDurationMinutes = duration * totalSessions;

            // Calculate the new last session time
            const endHours = sessionHours + Math.floor(totalDurationMinutes / 60);
            const endMinutes = sessionMinutes + (totalDurationMinutes % 60);
            const finalHours = endHours + Math.floor(endMinutes / 60); // Adjust for overflow
            const finalMinutes = endMinutes % 60;

            const lastSessionTime = `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
            setFormData((prevData) => ({
                ...prevData,
                lastSessionDate,
                lastSessionTime
            }));
        }
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({
            sessionDate: '',
            sessionTime: '',
            totalSessions: '',
            sessionInterval: '',
            preferredDays: '',
            durationPerSession: '',
            lastSessionDate: '',
            lastSessionTime: ''
        });
    };

    const handleCancel = () => {
        setFormData({
            sessionDate: '',
            sessionTime: '',
            totalSessions: '',
            sessionInterval: '',
            preferredDays: '',
            durationPerSession: '',
            lastSessionDate: '',
            lastSessionTime: ''
        });
    };

    useEffect(() => {
        updateLastSessionDetails();
    },[formData.sessionDate, formData.sessionTime, formData.totalSessions, formData.sessionInterval, formData.durationPerSession])

    return (
        <div className="session-form">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <label>
                            Session date
                            <input type="date" name="sessionDate" value={formData.sessionDate} onChange={handleChange} placeholder="Session Date" />
                        </label>

                    </div>
                    <div class="col-lg-4">
                        <label>
                            Session time
                            <input type="time" name="sessionTime" value={formData.sessionTime} onChange={handleChange} placeholder="Session Time" />
                        </label>
                    </div>
                    <div class="col-lg-4">
                        <label>
                            Total sessions
                            <input type="number" name="totalSessions" value={formData.totalSessions} onChange={handleChange} placeholder="Total Sessions" />
                        </label>
                    </div>
                    <div className='col-lg-4'>
                        <label>
                            Session interval
                            <input type="text" name="sessionInterval" value={formData.sessionInterval} onChange={handleChange} placeholder="Session Interval" />
                        </label>
                    </div>
                    <div className='col-lg-6 d-flex'>
                        <label>
                            Preferred days
                            <input type="text" name="preferredDays" value={formData.preferredDays} onChange={handleChange} placeholder="Preferred Days" />
                        </label>
                    </div>
                    <div className='col-lg-4'>
                        <label>
                            Duration per session
                            <input type="number" name="durationPerSession" value={formData.durationPerSession} onChange={handleChange} placeholder="Duration Per Session" />
                        </label>
                    </div>
                    <div className='col'>
                        <label>
                            Last session date
                            <input type="date" name="lastSessionDate" value={formData.lastSessionDate} onChange={handleChange} placeholder="Last Session Date" readOnly/>
                        </label>

                    </div>
                    <div className='col'>
                        <label>
                            Last session time
                            <input type="time" name="lastSessionTime" value={formData.lastSessionTime} onChange={handleChange} placeholder="Last Session Time" readOnly />
                        </label>
                    </div>
                </div>
            </div>
            <div className='btn'>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default SessionForm;
