import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { QrCode, Download, Wallet, CheckCircle2, Clock, XCircle } from 'lucide-react';
import type { VictimCase } from '@/types';

interface JusticeWalletProps {
  caseData: VictimCase;
}

const JusticeWallet = ({ caseData }: JusticeWalletProps) => {
  const getStatusIcon = () => {
    switch (caseData.status) {
      case 'disbursed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'pending':
      case 'verified':
      case 'sanctioned':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusVariant = () => {
    switch (caseData.status) {
      case 'disbursed':
        return 'approved';
      case 'verified':
        return 'verified';
      case 'sanctioned':
        return 'info';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'rejected';
      default:
        return 'default';
    }
  };

  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('Downloading Justice Wallet PDF...');
  };

  return (
    <Card className="border-2 border-primary/20 shadow-elevated">
      <CardHeader className="bg-gradient-hero text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8" />
            <CardTitle className="text-2xl">Justice Wallet</CardTitle>
          </div>
          <Badge variant={getStatusVariant()} className="text-sm">
            {caseData.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Case Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Case ID</p>
            <p className="font-bold text-foreground">{caseData.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Application Date</p>
            <p className="font-semibold">{new Date(caseData.filingDate).toLocaleDateString('en-IN')}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Beneficiary Name</p>
            <p className="font-semibold">{caseData.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">District</p>
            <p className="font-semibold">{caseData.district}, {caseData.state}</p>
          </div>
        </div>

        {/* DBT Status */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            {getStatusIcon()}
            <h3 className="font-semibold text-foreground">DBT Transfer Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Relief Amount</span>
              <span className="font-bold text-success">₹{caseData.amount?.toLocaleString('en-IN') || 'Pending'}</span>
            </div>
            {caseData.dbtTransactionId && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-xs">{caseData.dbtTransactionId}</span>
              </div>
            )}
            {caseData.sanctionOrderNumber && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sanction Order</span>
                <span className="font-mono text-xs">{caseData.sanctionOrderNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-4 bg-card border-2 border-dashed border-primary/30 rounded-lg p-6">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="w-48 h-48 bg-muted flex items-center justify-center">
              <QrCode className="w-32 h-32 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Scan QR for Verification
          </p>
          <p className="text-xs text-muted-foreground font-mono">{caseData.id}</p>
        </div>

        {/* Download Button */}
        <Button 
          onClick={handleDownloadPDF}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Wallet PDF
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          This Justice Wallet is digitally generated and can be used for verification purposes.
          Keep this safe for your records.
        </p>
      </CardContent>
    </Card>
  );
};

export default JusticeWallet;
