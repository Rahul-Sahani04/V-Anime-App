import React from 'react';
import './wavy_loader.css';

function Wavy() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div class="spinner"></div>
        </div>
    );
}

export default Wavy;