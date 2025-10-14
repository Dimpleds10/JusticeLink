import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, Shield, Key, FileText, AlertTriangle } from 'lucide-react';

const Admin = () => {
  return (
    <Layout title="System Admin Portal" role="Administrator">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-l-4 border-l-warning bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-10 h-10 text-warning" />
              <div>
                <CardTitle className="text-2xl">System Administration</CardTitle>
                <CardDescription>Manage users, roles, and system configuration</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="roles">Roles & Access</TabsTrigger>
            <TabsTrigger value="sla">SLA Configuration</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <CardTitle>Active Users</CardTitle>
                  </div>
                  <Button>Add New User</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Rajesh Kumar', role: 'State Official', district: 'Mumbai', status: 'active' },
                    { name: 'Priya Sharma', role: 'District Officer', district: 'Chennai', status: 'active' },
                    { name: 'Anil Desai', role: 'NGO Coordinator', district: 'Pune', status: 'active' },
                    { name: 'Lakshmi Iyer', role: 'Central Officer', district: 'Delhi', status: 'active' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.role} • {user.district}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="approved">{user.status}</Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-info" />
                  <CardTitle>Role-Based Access Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { role: 'Victim', access: ['Apply', 'Track', 'Wallet'], color: 'primary' },
                    { role: 'NGO', access: ['Register', 'Track', 'Campaigns'], color: 'secondary' },
                    { role: 'State Official', access: ['Verify', 'Sanction', 'Analytics'], color: 'accent' },
                    { role: 'Central Ministry', access: ['National Dashboard', 'Policy', 'Reports'], color: 'info' },
                    { role: 'Admin', access: ['All Permissions'], color: 'warning' },
                    { role: 'Auditor', access: ['View', 'Audit', 'Reports'], color: 'success' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.role}</h4>
                        <div className="flex gap-2 mt-2">
                          {item.access.map((perm, i) => (
                            <Badge key={i} variant="outline">{perm}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-warning" />
                  <CardTitle>SLA Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-info/20">
                      <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Verification SLA</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-info">7 Days</p>
                        <p className="text-xs text-muted-foreground mt-1">From FIR filing</p>
                      </CardContent>
                    </Card>
                    <Card className="border-warning/20">
                      <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Sanction SLA</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-warning">5 Days</p>
                        <p className="text-xs text-muted-foreground mt-1">After verification</p>
                      </CardContent>
                    </Card>
                    <Card className="border-success/20">
                      <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Disbursement SLA</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-success">3 Days</p>
                        <p className="text-xs text-muted-foreground mt-1">After sanction</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning mt-1" />
                      <div>
                        <h4 className="font-semibold text-warning mb-2">Alert Settings</h4>
                        <p className="text-sm text-foreground/80">
                          SMS alerts will be sent to officials when cases exceed 80% of SLA timeframe.
                          Automatic escalation occurs at 100% SLA breach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Key className="w-6 h-6 text-destructive" />
                  <CardTitle>Security & Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-success/20">
                    <CardHeader>
                      <CardTitle className="text-sm">Multi-Factor Authentication</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <Badge variant="approved">Enabled</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Configure MFA
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-info/20">
                    <CardHeader>
                      <CardTitle className="text-sm">Encryption Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">End-to-End</span>
                        <Badge variant="approved">Active</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-info/5 border-info/20">
                  <CardHeader>
                    <CardTitle className="text-base">CERT-In Security Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        'SSL/TLS encryption enabled',
                        'Regular security audits scheduled',
                        'Data backup every 24 hours',
                        'Access logs maintained for 90 days',
                        'Intrusion detection system active',
                        'DPDP Act 2023 compliance verified',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="approved" className="w-6 h-6 p-0 flex items-center justify-center">✓</Badge>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Security Logs</h4>
                  <div className="space-y-1 text-sm font-mono">
                    <p className="text-muted-foreground">[2025-01-14 10:23:45] User login: admin@msje.gov.in</p>
                    <p className="text-muted-foreground">[2025-01-14 09:15:22] Database backup completed</p>
                    <p className="text-muted-foreground">[2025-01-14 08:00:00] Security scan: No threats detected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
