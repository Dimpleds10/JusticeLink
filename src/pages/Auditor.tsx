import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, Download, CheckCircle2, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { getCases } from '@/lib/mockData';

const Auditor = () => {
  const cases = getCases();
  const [selectedCase, setSelectedCase] = useState(cases[0]);

  const generateAuditReport = () => {
    alert('Generating comprehensive audit report PDF...');
  };

  return (
    <Layout title="Audit Portal" role="Auditor">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-l-4 border-l-success bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileCheck className="w-10 h-10 text-success" />
              <div>
                <CardTitle className="text-2xl">Audit & Compliance Portal</CardTitle>
                <CardDescription>Independent verification and compliance monitoring</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cases">Case Audit Log</TabsTrigger>
            <TabsTrigger value="sla">SLA Compliance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases Audited</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{cases.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">All-time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-success">94%</p>
                  <p className="text-xs text-muted-foreground mt-1">Process adherence</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">AI Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-info">96%</p>
                  <p className="text-xs text-muted-foreground mt-1">vs Human decisions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">SLA Breaches</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-warning">3</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Audit Summary Dashboard</CardTitle>
                <CardDescription>Key findings and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold text-success mb-1">Process Compliance: Excellent</h4>
                      <p className="text-sm text-foreground/80">
                        94% of cases followed proper maker-checker approval workflow. All financial transactions logged correctly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning mt-1" />
                    <div>
                      <h4 className="font-semibold text-warning mb-1">SLA Compliance: Needs Attention</h4>
                      <p className="text-sm text-foreground/80">
                        3 cases exceeded verification SLA by 2+ days. Recommend additional verification staff for Mumbai district.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-info mt-1" />
                    <div>
                      <h4 className="font-semibold text-info mb-1">AI System Performance: Strong</h4>
                      <p className="text-sm text-foreground/80">
                        AI verification suggestions matched human decisions in 96% of cases. Zero false positives detected.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle>Immutable Case Audit Log</CardTitle>
                <CardDescription>Complete timeline of all case activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cases.map((caseItem) => (
                    <Card key={caseItem.id} className="cursor-pointer hover:shadow-card transition-shadow" onClick={() => setSelectedCase(caseItem)}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold">{caseItem.id}</h4>
                              <Badge variant={
                                caseItem.status === 'disbursed' ? 'approved' :
                                caseItem.status === 'verified' ? 'verified' :
                                caseItem.status === 'rejected' ? 'rejected' : 'pending'
                              }>
                                {caseItem.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Applicant: {caseItem.name}</p>
                            <p className="text-sm text-muted-foreground">Last Updated: {new Date(caseItem.lastUpdated).toLocaleDateString('en-IN')}</p>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedCase && (
                  <Card className="mt-6 border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle>Detailed Audit Trail: {selectedCase.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedCase.timeline.map((event, index) => (
                          <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                            <div className="mt-1">
                              {event.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5 text-success" />
                              ) : event.status === 'in-progress' ? (
                                <AlertTriangle className="w-5 h-5 text-warning" />
                              ) : (
                                <XCircle className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{event.stage}</h4>
                              {event.date && (
                                <p className="text-sm text-muted-foreground">
                                  {new Date(event.date).toLocaleString('en-IN')}
                                </p>
                              )}
                              {event.notes && (
                                <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                              )}
                              <Badge variant="outline" className="mt-2">{event.status}</Badge>
                            </div>
                          </div>
                        ))}

                        <div className="bg-muted/30 rounded-lg p-4 mt-4">
                          <h4 className="font-semibold mb-2">AI vs Human Decision Analysis</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">AI Recommendation</p>
                              <p className="font-medium">Approve (Confidence: 94%)</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Human Decision</p>
                              <p className="font-medium">Approved</p>
                            </div>
                          </div>
                          <Badge variant="approved" className="mt-3">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Decisions Matched
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla">
            <Card>
              <CardHeader>
                <CardTitle>SLA Compliance Summary</CardTitle>
                <CardDescription>Service level agreement adherence across all stages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-info/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Verification Stage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">SLA Target</span>
                          <span className="font-bold">7 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg Actual</span>
                          <span className="font-bold">5.2 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Compliance</span>
                          <Badge variant="approved">96%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-warning/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Sanction Stage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">SLA Target</span>
                          <span className="font-bold">5 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg Actual</span>
                          <span className="font-bold">4.8 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Compliance</span>
                          <Badge variant="approved">92%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-success/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Disbursement Stage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">SLA Target</span>
                          <span className="font-bold">3 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg Actual</span>
                          <span className="font-bold">2.1 Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Compliance</span>
                          <Badge variant="approved">98%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-warning/5 border-warning/20">
                  <CardHeader>
                    <CardTitle className="text-base">SLA Breach Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div>
                          <h4 className="font-semibold">JL-MH-2025-003</h4>
                          <p className="text-sm text-muted-foreground">Verification exceeded by 2 days</p>
                        </div>
                        <Badge variant="warning">+2 days</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div>
                          <h4 className="font-semibold">JL-TN-2025-005</h4>
                          <p className="text-sm text-muted-foreground">Verification exceeded by 3 days</p>
                        </div>
                        <Badge variant="warning">+3 days</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div>
                          <h4 className="font-semibold">JL-MP-2025-007</h4>
                          <p className="text-sm text-muted-foreground">Sanction exceeded by 1 day</p>
                        </div>
                        <Badge variant="warning">+1 day</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generate Audit Reports</CardTitle>
                    <CardDescription>Download comprehensive compliance and audit reports</CardDescription>
                  </div>
                  <Button onClick={generateAuditReport}>
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Monthly Compliance Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive overview of SLA compliance, process adherence, and key findings
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">December 2024</Button>
                        <Button variant="outline" size="sm" className="flex-1">January 2025</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-info/20">
                    <CardHeader>
                      <CardTitle className="text-base">AI Performance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Detailed comparison of AI recommendations vs human decisions
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Download Report</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-success/20">
                    <CardHeader>
                      <CardTitle className="text-base">Financial Audit Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        DBT transaction verification and fund utilization analysis
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Download Report</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-warning/20">
                    <CardHeader>
                      <CardTitle className="text-base">Security & Data Privacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        DPDP Act 2023 compliance verification and security audit
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Download Report</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base">Recent Audit Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-background rounded">
                        <span>January 2025 Monthly Report.pdf</span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-background rounded">
                        <span>Q4 2024 Compliance Summary.pdf</span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-background rounded">
                        <span>Annual Security Audit 2024.pdf</span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
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

export default Auditor;
