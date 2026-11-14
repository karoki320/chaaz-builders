import { Icon } from "@/components/Icon";
import { BUSINESS } from "@/lib/business";
import { whatsappLink } from "@/lib/whatsapp";

const points = [
  { icon: "truck", title: "Delivery", text: BUSINESS.deliveryNote },
  { icon: "whatsapp", title: "Order on WhatsApp", text: BUSINESS.paymentNote },
  { icon: "shield", title: "Genuine products", text: "Quality materials from trusted manufacturers only." },
  { icon: "phone", title: "Real support", text: `Call or WhatsApp us on ${BUSINESS.phoneDisplay}.` },
];

export function TrustSection() {
  return (
    <section className="bg-white border-y border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div key={p.title} className="flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/5 text-brand">
                <Icon name={p.icon} size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">{p.title}</h3>
                <p className="text-sm text-neutral-500 mt-0.5">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl bg-surface p-5 sm:p-6">
          <div className="space-y-2 text-sm text-neutral-600">
            <p className="flex items-center gap-2">
              <Icon name="map-pin" size={18} className="text-brand" />
              {BUSINESS.address ? (
                BUSINESS.mapUrl ? (
                  <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {BUSINESS.address}
                  </a>
                ) : (
                  BUSINESS.address
                )
              ) : (
                <>We deliver across {BUSINESS.deliveryArea}</>
              )}
            </p>
            {BUSINESS.hours && (
              <p className="flex items-center gap-2">
                <Icon name="clock" size={18} className="text-brand" /> {BUSINESS.hours}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink("Hi Chaaz Builders, I'd like to place an order.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-gradient text-white px-6 py-3 text-sm font-semibold"
            >
              <Icon name="whatsapp" size={18} /> Order on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-6 py-3 text-sm font-semibold text-brand-dark"
            >
              <Icon name="phone" size={18} /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
