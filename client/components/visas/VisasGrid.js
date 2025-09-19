'use client'
import { useEffect, useMemo, useState } from "react";
import VisaCard from "@/components/shared/card/VisaCard";
import VisaCardSkeleton from "../shared/skeleton/VisaCardSkeleton";

const VisasGrid = () => {
    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({ types: [], countries: [] });

    const filtered = useMemo(() => {
        return visas.filter((v) => {
            const byType = filter.types.length === 0 || filter.types.includes(v.type?._id);
            const byCountry = filter.countries.length === 0 || filter.countries.includes(v.country);
            return byType && byCountry;
        });
    }, [visas, filter]);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/visa/get-visas`, { cache: 'no-store' });
                const json = await res.json();
                setVisas(json.data || []);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        function onFilter(e) {
            setFilter(e.detail);
        }
        window.addEventListener('visas:filter', onFilter);
        return () => window.removeEventListener('visas:filter', onFilter);
    }, []);

    return (
        <section className="lg:col-span-9 md:col-span-8 col-span-12 flex flex-col gap-y-4">
            <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
                {loading && filtered.length === 0
                    ? Array.from({ length: 9 }, (_, i) => (
                        <VisaCardSkeleton />))
                    : filtered.map((v) => <VisaCard key={v._id} visa={v} />)}
                {!loading && filtered.length === 0 && (
                    Array.from({ length: 9 }, (_, i) => (
                        <VisaCardSkeleton />))
                )}
            </div>
        </section>
    );
};

export default VisasGrid;

