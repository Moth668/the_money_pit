import React from 'react'
import '../App.css'

function Home() {
  return (
      <div className="home-container">
          {/* Header */}
          <header className="header">
              <h1>Your Fianacial Success Story</h1>
          </header>

          {/* Main content */}
          <main className="main-content">
              <h2>💰Welcome to The Money Pit!💰</h2>
                <p style={{ fontFamily: 'Arial, sans-serif' }}>Here you can track your expenses and income, and see how much money you have left at the end of the month.</p>
                <p style={{ fontFamily: 'Arial, sans-serif' }}>Get started by creating an account or logging in!</p>
          </main>
      </div>
  );
}

export default Home;
  