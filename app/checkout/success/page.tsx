import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <CheckCircle2 size={56} className="text-amber-light mx-auto mb-5" />
      <h1 className="font-display text-3xl text-ivory mb-2">Order confirmed</h1>
      <p className="text-smoke mb-1">
        Order <span className="font-mono text-ivory">{order}</span> is being prepared.
      </p>
      <p className="text-smoke text-sm mb-8">
        Track your delivery partner live once your order is picked up.
      </p>
      <Link href="/products" className="btn-pour">
        Continue shopping
      </Link>
    </div>
  );
}
