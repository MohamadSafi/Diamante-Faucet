import React from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FaucetForm } from './components/FaucetForm';
import { NetworkStatus } from './components/NetworkStatus';
import { Notification } from './components/Notification';
import { DiamanteLogo } from './components/DiamanteLogo';

export default function App() {
  return (
    <>
      <Background />
      <Header />
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 pt-24 pb-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4 floating-element">
            <div className="inline-block">
              <DiamanteLogo className="h-20 mx-auto" />
            </div>
            <h1 className="text-4xl font-bold text-[#bfe3e9]">Diamante Faucet</h1>
            <p className="text-[#bfe3e9]/80">Get test tokens for the Diamante network</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 md:p-8 backdrop-blur-lg">
            <FaucetForm />
          </div>
          
          <NetworkStatus />
        </div>
      </div>
      <Footer />
      <Notification />
    </>
  );
}