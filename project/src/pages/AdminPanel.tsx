import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Shield, 
  Users, 
  Activity, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Search,
  MapPin,
  Clock,
  Smartphone,
  Key,
  Eye,
  Filter
} from 'lucide-react';

const AdminPanel = () => {
  const [globalPasswordlessEnabled, setGlobalPasswordlessEnabled] = useState(true);
  const [otpFallbackEnabled, setOtpFallbackEnabled] = useState(true);
  const [deviceBindingEnabled, setDeviceBindingEnabled] = useState(true);

  // Mock data - in real implementation, this would come from Supabase
  const systemHealth = {
    totalUsers: 1248,
    activeUsers: 342,
    flaggedAccounts: 12,
    successfulLogins: 2341,
    failedAttempts: 45,
    systemStatus: 'healthy'
  };

  const recentLogins = [
    { id: 1, user: 'john.doe', timestamp: '2 minutes ago', location: 'New York, NY', status: 'success', riskScore: 'low' },
    { id: 2, user: 'jane.smith', timestamp: '5 minutes ago', location: 'London, UK', status: 'success', riskScore: 'medium' },
    { id: 3, user: 'bob.wilson', timestamp: '8 minutes ago', location: 'Unknown', status: 'failed', riskScore: 'high' },
    { id: 4, user: 'alice.brown', timestamp: '12 minutes ago', location: 'Paris, FR', status: 'success', riskScore: 'low' },
  ];

  const behavioralParams = [
    { name: 'Typing Speed', enabled: true, threshold: '150ms', current: '142ms' },
    { name: 'Mouse Movement', enabled: true, threshold: '95%', current: '97%' },
    { name: 'Touch Patterns', enabled: false, threshold: '90%', current: 'N/A' },
    { name: 'Geolocation Consistency', enabled: true, threshold: '10km', current: '2.3km' },
    { name: 'Device Tilt', enabled: false, threshold: '15°', current: 'N/A' },
  ];

  const suspiciousActivity = [
    { id: 1, type: 'Multiple Failed Logins', user: 'suspicious.user', severity: 'high', timestamp: '5 min ago' },
    { id: 2, type: 'Location Anomaly', user: 'travel.user', severity: 'medium', timestamp: '12 min ago' },
    { id: 3, type: 'Device Mismatch', user: 'device.change', severity: 'low', timestamp: '1 hour ago' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getRiskScoreColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage authentication, monitor security, and oversee user activity</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Auth Controls
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Behavioral
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemHealth.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">of {systemHealth.totalUsers} total users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged Accounts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{systemHealth.flaggedAccounts}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Login Attempts</CardTitle>
                  <CardDescription>Latest authentication activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLogins.map((login) => (
                      <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${login.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div>
                            <p className="font-medium">{login.user}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {login.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getRiskScoreColor(login.riskScore)}>{login.riskScore}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{login.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suspicious Activity</CardTitle>
                  <CardDescription>Real-time security alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suspiciousActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-muted-foreground">{activity.user}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getSeverityColor(activity.severity)}>{activity.severity}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Search and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input placeholder="Search users..." className="w-full" />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLogins.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.user}</TableCell>
                        <TableCell>{user.timestamp}</TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell>
                          <Badge variant={getRiskScoreColor(user.riskScore)}>{user.riskScore}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'success' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auth Controls Tab */}
          <TabsContent value="auth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Passwordless Authentication Controls</CardTitle>
                <CardDescription>Manage global authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Global Passwordless Authentication</Label>
                    <p className="text-sm text-muted-foreground">Enable or disable passwordless auth system-wide</p>
                  </div>
                  <Switch 
                    checked={globalPasswordlessEnabled} 
                    onCheckedChange={setGlobalPasswordlessEnabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">OTP Fallback</Label>
                    <p className="text-sm text-muted-foreground">Allow OTP as backup authentication method</p>
                  </div>
                  <Switch 
                    checked={otpFallbackEnabled} 
                    onCheckedChange={setOtpFallbackEnabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Device Binding</Label>
                    <p className="text-sm text-muted-foreground">Bind authentication to specific devices</p>
                  </div>
                  <Switch 
                    checked={deviceBindingEnabled} 
                    onCheckedChange={setDeviceBindingEnabled}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base">Per-User Controls</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user-search">User Identifier</Label>
                      <Input id="user-search" placeholder="Enter username or email" />
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" className="w-full">Apply Settings</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavioral Tab */}
          <TabsContent value="behavioral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Behavioral Authentication Parameters</CardTitle>
                <CardDescription>Configure biometric and behavioral analysis settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {behavioralParams.map((param, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">{param.name}</Label>
                          <p className="text-sm text-muted-foreground">
                            Threshold: {param.threshold} | Current: {param.current}
                          </p>
                        </div>
                        <Switch checked={param.enabled} />
                      </div>
                      
                      {param.enabled && (
                        <div className="ml-6 space-y-2">
                          <Label htmlFor={`threshold-${index}`}>Sensitivity Threshold</Label>
                          <Input 
                            id={`threshold-${index}`}
                            value={param.threshold} 
                            className="w-32"
                          />
                        </div>
                      )}
                      
                      {index < behavioralParams.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Manage API keys and integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Primary API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api-key"
                        type="password" 
                        value="sk-***************************" 
                        readOnly
                      />
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url"
                      placeholder="https://your-app.com/webhook" 
                    />
                  </div>

                  <Button className="w-full">Update Configuration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                  <CardDescription>Configure system security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout"
                      type="number" 
                      value="30" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input 
                      id="max-attempts"
                      type="number" 
                      value="5" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                    <Input 
                      id="lockout-duration"
                      type="number" 
                      value="15" 
                    />
                  </div>

                  <Button className="w-full">Save Policies</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;