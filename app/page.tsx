import PageGate from './page-gate';
import ComingSoon from './coming-soon';
import HomePage from './home-page';

export default function RootPage() {
  return (
    <PageGate fallback={<ComingSoon />}>
      <HomePage />
    </PageGate>
  );
}
