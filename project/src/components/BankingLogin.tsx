import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Shield, User, CheckCircle, AlertCircle } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

const BankingLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup geolocation watcher on unmount
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setLocationPermissionStatus('denied');
      return;
    }

    setIsLoading(true);

    // Set up continuous location tracking
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        
        setLocation(newLocation);
        setLocationError(null);
        setLocationPermissionStatus('granted');
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = '';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services for secure banking.';
            setLocationPermissionStatus('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = 'An unknown error occurred while retrieving location.';
            break;
        }
        
        setLocationError(errorMessage);
        setIsLoading(false);
        
        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermissionStatus('denied');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // Cache location for 1 minute
      }
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }

    // Simulate login process
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', {
        username: username.trim(),
        location,
        timestamp: new Date().toISOString(),
      });
    }, 1500);
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const getTimeSinceUpdate = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-20">
      
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between w-20 h-16 bg-primary rounded-2xl mx-auto mb-4 ">
            {/* <Shield className="w-8 h-8 text-primary-foreground" /> */}
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/20 text-xs"
              onClick={() => window.location.href = '/admin'}
            >
              Admin
            </Button>
          </div>
        <div className="text-center space-y-2">
          
          {/* <h1 className="text-2xl font-bold text-foreground">SecureBank</h1>
          <p className="text-muted-foreground">Secure banking with location verification</p> */}
          <img src='/images/boi.png' alt="Bank Logo" className="w-44 mx-auto mt-2" />
        </div>
        

        {/* Location Status */}
        {locationPermissionStatus === 'granted' && location && (
          <Alert className="border-success bg-success-light">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertDescription className="text-success-foreground text-black">
              <div className="space-y-1">
                <div className="font-medium">Location verified</div>
                <div className="text-sm opacity-90">
                  {formatCoordinates(location.latitude, location.longitude)}
                </div>
                <div className="text-xs opacity-75">
                  Accuracy: ±{Math.round(location.accuracy)}m • Updated {getTimeSinceUpdate(location.timestamp)}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Location Error */}
        {locationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Enter your username to access your account
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-foreground">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 border-input-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                {/* Get Location Button - Shows initially */}
                {locationPermissionStatus === 'pending' && !isLoading && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={requestLocationPermission}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Location for Secure Access
                  </Button>
                )}

                <Button
                  type="submit"
                  variant="banking"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !username.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In Securely'
                  )}
                </Button>

                {locationPermissionStatus === 'denied' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={requestLocationPermission}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Try Again - Enable Location Services
                  </Button>
                )}
              </div>
            </form>

            <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
              <p>
                Your location is tracked for security purposes and fraud prevention.
                <br />
                By signing in, you agree to our security protocols.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Loading Indicator for Location */}
        {isLoading && locationPermissionStatus === 'pending' && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Requesting location access...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankingLogin;