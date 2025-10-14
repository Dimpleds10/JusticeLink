import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Star, UserPlus, Calendar, Award, TrendingUp } from 'lucide-react';
import { mockNGOs, getCases } from '@/lib/mockData';

const NGO = () => {
  const [selectedNGO] = useState(mockNGOs[0]);
  const cases = getCases();
  const ngoCases = cases.filter(c => c.district === selectedNGO.district);

  return (
    <Layout title="NGO Portal" role="NGO / Civil Society">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* NGO Profile Card */}
        <Card className="border-l-4 border-l-secondary bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-10 h-10 text-secondary" />
                <div>
                  <CardTitle className="text-2xl">{selectedNGO.name}</CardTitle>
                  <CardDescription>Registration: {selectedNGO.registrationNumber}</CardDescription>
                </div>
              </div>
              <Badge variant="approved" className="text-base px-4 py-2">
                {selectedNGO.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Contact Person</p>
                <p className="font-semibold">{selectedNGO.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{selectedNGO.district}, {selectedNGO.state}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cases Handled</p>
                <p className="font-semibold text-primary">{selectedNGO.casesHandled}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reputation Score</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <p className="font-semibold">{selectedNGO.reputationScore}/5.0</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="register">Register Victim</TabsTrigger>
            <TabsTrigger value="cases">Track Cases</TabsTrigger>
            <TabsTrigger value="campaigns">Awareness Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    <CardTitle className="text-sm font-medium text-muted-foreground">Victims Registered</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{selectedNGO.casesHandled}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total registrations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">87%</p>
                  <p className="text-xs text-muted-foreground mt-1">Relief approved</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-warning" />
                    <CardTitle className="text-sm font-medium text-muted-foreground">Reputation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-warning">{selectedNGO.reputationScore}/5.0</p>
                  <p className="text-xs text-muted-foreground mt-1">Government rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Reputation Scorecard */}
            <Card>
              <CardHeader>
                <CardTitle>NGO Reputation Scorecard</CardTitle>
                <CardDescription>AI-generated performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Document Quality</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-muted-foreground">88%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-info h-2 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Victim Support</span>
                    <span className="text-sm text-muted-foreground">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Case Success Rate</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <UserPlus className="w-6 h-6 text-secondary" />
                  <div>
                    <CardTitle>Register New Victim</CardTitle>
                    <CardDescription>Help victims apply for PCR/PoA relief</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="victim-name">Victim Name *</Label>
                      <Input id="victim-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="victim-contact">Contact Number *</Label>
                      <Input id="victim-contact" type="tel" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="victim-category">Category *</Label>
                      <Input id="victim-category" placeholder="SC/ST/OBC" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incident-date">Incident Date *</Label>
                      <Input id="incident-date" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fir-upload">Upload FIR Document *</Label>
                    <Input id="fir-upload" type="file" accept=".pdf" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supporting-docs">Supporting Documents</Label>
                    <Input id="supporting-docs" type="file" accept=".pdf" multiple />
                  </div>

                  <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <h4 className="font-semibold text-info mb-2">Consent Collection</h4>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" required className="mt-1 rounded" />
                      <span className="text-sm">
                        I hereby confirm that I have obtained consent from the victim for data collection and processing
                        as per DPDP Act 2023, and that all information provided is accurate to the best of my knowledge.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">Register Victim</Button>
                    <Button type="button" variant="outline">Save Draft</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle>Cases Registered by NGO</CardTitle>
                <CardDescription>Track progress of victims you've assisted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ngoCases.map((caseItem) => (
                    <Card key={caseItem.id} className="border-l-4 border-l-secondary">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold">{caseItem.id}</h4>
                              <Badge variant={caseItem.status === 'disbursed' ? 'approved' : 'pending'}>
                                {caseItem.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Beneficiary: {caseItem.name}</p>
                            <p className="text-sm text-muted-foreground">Filed: {new Date(caseItem.filingDate).toLocaleDateString('en-IN')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="text-xl font-bold text-success">₹{caseItem.amount?.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-secondary" />
                  <div>
                    <CardTitle>Awareness Campaign Tools</CardTitle>
                    <CardDescription>Organize workshops and outreach programs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-base">IEC Material Kit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download Information, Education, and Communication materials in regional languages
                      </p>
                      <Button variant="outline" className="w-full">
                        Download Kit
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Workshop Scheduler</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Schedule awareness workshops in your district
                      </p>
                      <Button variant="outline" className="w-full">
                        Schedule Workshop
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-secondary/5 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-base">Upcoming Workshops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div>
                          <h4 className="font-semibold">PCR Act Awareness Session</h4>
                          <p className="text-sm text-muted-foreground">Mumbai Community Center</p>
                        </div>
                        <Badge variant="info">Jan 25, 2025</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div>
                          <h4 className="font-semibold">Legal Aid Workshop</h4>
                          <p className="text-sm text-muted-foreground">District Court Complex</p>
                        </div>
                        <Badge variant="info">Feb 5, 2025</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NGO;
