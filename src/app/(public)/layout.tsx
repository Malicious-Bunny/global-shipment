import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ChatWidget from '@/components/public/ChatWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
