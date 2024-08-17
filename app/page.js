'use client'
import React from 'react';
import ReactDOM from 'react-dom';
import Script from 'next/script';
import {useState} from 'react'
import Navbar from "./navbar";



export default function Home() {
  return (
    <div>
      <Navbar /> {}
      <header>Score: <span id="score">0</span></header>
      <canvas id="gameWindow" width="600" height="900"></canvas>
      <Script src="/scripts/constants.js" strategy="afterInteractive" />
      <Script src="/scripts/piece.js" strategy="afterInteractive" />
      <Script src="/scripts/board.js" strategy="afterInteractive" />
      <Script src="/scripts/gameScript.js" strategy="afterInteractive" />
    </div>
  );
}