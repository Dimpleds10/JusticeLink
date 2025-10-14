import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import JusticeWallet from '@/components/JusticeWallet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, FileText, Upload, MessageCircle, BookOpen, Trophy, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { getCases, addCase } from '@/lib/mockData';
import type { VictimCase } from '@/types';

const Victim = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userCase, setUserCase] = useState<VictimCase | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  useEffect(() => {
    // For demo, get the first case or create new
    const cases = getCases();
    const demoCase = cases.find(c => c.id === 'JL-MH-2025-001');
    if (demoCase) {
      setUserCase(demoCase);
    }
  }, []);

  const handleSubmitApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newCase: VictimCase = {
      id: `JL-${formData.get('state')?.toString().substring(0, 2).toUpperCase()}-2025-${String(getCases().length + 1).padStart(3, '0')}`,
      caseNumber: `FIR/2025/${formData.get('district')?.toString().substring(0, 3).toUpperCase()}/${String(getCases().length + 1).padStart(3, '0')}`,
      name: formData.get('name') as string,
      district: formData.get('district') as any,
      state: formData.get('state') as any,
      status: 'pending',
      filingDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      amount: parseInt(formData.get('amount') as string) || 50000,
      category: formData.get('category') as any,
      documents: [],
      timeline: [
        { stage: 'FIR Registration', status: 'completed', date: new Date().toISOString().split('T')[0] },
        { stage: 'Document Upload', status: 'in-progress' },
        { stage: 'Verification', status: 'pending' },
        { stage: 'Sanction', status: 'pending' },
        { stage: 'DBT Transfer', status: 'pending' },
      ],
    };
    
    addCase(newCase);
    setUserCase(newCase);
    setShowApplicationForm(false);
    setActiveTab('wallet');
  };

  return (
    <Layout title="Victim Portal" role="Victim / Applicant">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <Card className="border-l-4 border-l-primary bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">Welcome to Your Relief Portal</CardTitle>
                <CardDescription>Track your application and access justice resources</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="apply">Apply for Relief</TabsTrigger>
            <TabsTrigger value="wallet">Justice Wallet</TabsTrigger>
            <TabsTrigger value="awareness">Know Your Rights</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {userCase ? (
              <>
                {/* Case Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Timeline</CardTitle>
                    <CardDescription>Track your relief application progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userCase.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="mt-1">
                            {event.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : event.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-warning" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{event.stage}</h4>
                              <Badge variant={
                                event.status === 'completed' ? 'approved' :
                                event.status === 'in-progress' ? 'pending' : 'default'
                              }>
                                {event.status}
                              </Badge>
                            </div>
                            {event.date && (
                              <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-IN')}</p>
                            )}
                            {event.notes && (
                              <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Case Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Case ID</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{userCase.id}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={userCase.status === 'disbursed' ? 'approved' : 'pending'} className="text-lg px-3 py-1">
                        {userCase.status.toUpperCase()}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Relief Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-success">₹{userCase.amount?.toLocaleString('en-IN')}</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Active Application</h3>
                  <p className="text-muted-foreground mb-6">Apply for relief to track your case</p>
                  <Button onClick={() => setActiveTab('apply')}>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="apply">
            {!showApplicationForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Apply for Relief</CardTitle>
                  <CardDescription>Submit your application for PCR/PoA relief assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <h4 className="font-semibold text-info mb-2">Before You Apply</h4>
                    <ul className="text-sm space-y-1 text-foreground/80">
                      <li>• Ensure you have a valid FIR copy</li>
                      <li>• Keep your Aadhaar and bank details ready</li>
                      <li>• Have supporting documents (caste certificate, income proof) available</li>
                      <li>• Read the consent and privacy notice carefully</li>
                    </ul>
                  </div>
                  <Button onClick={() => setShowApplicationForm(true)} className="w-full">
                    Start Application
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Relief Application Form</CardTitle>
                  <CardDescription>Fill in all required details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitApplication} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select name="category" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SC">Scheduled Caste (SC)</SelectItem>
                            <SelectItem value="ST">Scheduled Tribe (ST)</SelectItem>
                            <SelectItem value="OBC">Other Backward Class (OBC)</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select name="state" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District *</Label>
                        <Select name="district" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                            <SelectItem value="Pune">Pune</SelectItem>
                            <SelectItem value="Chennai">Chennai</SelectItem>
                            <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                            <SelectItem value="Bhopal">Bhopal</SelectItem>
                            <SelectItem value="Indore">Indore</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Relief Amount Requested</Label>
                        <Input id="amount" name="amount" type="number" defaultValue="50000" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload Documents
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fir">FIR Copy *</Label>
                          <Input id="fir" type="file" accept=".pdf" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="caste">Caste Certificate</Label>
                          <Input id="caste" type="file" accept=".pdf" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="income">Income Proof</Label>
                          <Input id="income" type="file" accept=".pdf" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bank">Bank Details</Label>
                          <Input id="bank" type="file" accept=".pdf" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <h4 className="font-semibold text-warning mb-2">Consent & Privacy</h4>
                      <p className="text-sm text-foreground/80 mb-3">
                        I hereby consent to the collection and processing of my data for the purpose of relief disbursement under PCR/PoA Acts.
                        I understand my data will be handled as per DPDP Act 2023.
                      </p>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" required className="rounded" />
                        <span className="text-sm">I agree to the terms and conditions</span>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1">Submit Application</Button>
                      <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="wallet">
            {userCase ? (
              <JusticeWallet caseData={userCase} />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Shield className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Justice Wallet Yet</h3>
                  <p className="text-muted-foreground">Apply for relief to get your Justice Wallet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="awareness" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>Know Your Rights</CardTitle>
                    <CardDescription>Information about PCR & PoA Acts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">Protection of Civil Rights (PCR) Act, 1955</h4>
                  <p className="text-sm text-foreground/80">
                    The PCR Act aims to abolish untouchability and provides penalties for any act that enforces or practices untouchability.
                    Victims are entitled to legal protection and compensation.
                  </p>
                </div>
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-secondary mb-2">Prevention of Atrocities (PoA) Act, 1989</h4>
                  <p className="text-sm text-foreground/80">
                    The PoA Act prevents atrocities against members of Scheduled Castes and Scheduled Tribes and provides for relief and
                    rehabilitation to victims through financial assistance and support services.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-success" />
                  <CardTitle>Success Stories</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-l-success pl-4">
                    <h4 className="font-semibold">Rani Devi - Mumbai, Maharashtra</h4>
                    <p className="text-sm text-muted-foreground">
                      Received ₹1,00,000 in relief and successfully reintegrated into society with legal aid support.
                    </p>
                  </div>
                  <div className="border-l-4 border-l-success pl-4">
                    <h4 className="font-semibold">Kumar Selvam - Chennai, Tamil Nadu</h4>
                    <p className="text-sm text-muted-foreground">
                      Got justice through fast-track court proceedings and received compensation within 45 days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-info" />
                  <div>
                    <CardTitle>Need Support?</CardTitle>
                    <CardDescription>Connect with legal aid and counseling services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-info/20">
                    <CardHeader>
                      <CardTitle className="text-base">Legal Aid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get free legal consultation and representation
                      </p>
                      <Button variant="outline" className="w-full">
                        Request Legal Aid
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-success/20">
                    <CardHeader>
                      <CardTitle className="text-base">Counseling Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Access mental health and trauma counseling
                      </p>
                      <Button variant="outline" className="w-full">
                        Book Counseling
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Helpline Numbers</h4>
                  <div className="space-y-1 text-sm">
                    <p>• National: <span className="font-mono font-bold">1800-180-6127</span></p>
                    <p>• Legal Aid: <span className="font-mono font-bold">1800-345-4545</span></p>
                    <p>• Women Helpline: <span className="font-mono font-bold">181</span></p>
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

export default Victim;
