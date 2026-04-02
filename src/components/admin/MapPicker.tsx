'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { MagnifyingGlass, CircleNotch } from '@phosphor-icons/react';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface Props {
  lat: number | null | undefined;
  lng: number | null | undefined;
  onChange: (lat: number, lng: number) => void;
}

export default function MapPicker({ lat, lng, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef    = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  const stableOnChange = useRef(onChange);
  stableOnChange.current = onChange;

  const initLat = useRef(lat);
  const initLng = useRef(lng);

  // Search state
  const [query,    setQuery]    = useState('');
  const [results,  setResults]  = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placeMarker = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (L: any, map: any, latlng: { lat: number; lng: number }) => {
      if (markerRef.current) {
        markerRef.current.setLatLng(latlng);
      } else {
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:28px;height:28px;
            background:#FECE14;
            border:3px solid #000;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            box-shadow:0 2px 8px rgba(0,0,0,0.35);
          "></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
        });
        markerRef.current = L.marker(latlng, { icon, draggable: true }).addTo(map);
        markerRef.current.on('dragend', () => {
          const p = markerRef.current.getLatLng();
          stableOnChange.current(
            parseFloat(p.lat.toFixed(6)),
            parseFloat(p.lng.toFixed(6)),
          );
        });
      }
      stableOnChange.current(
        parseFloat(latlng.lat.toFixed(6)),
        parseFloat(latlng.lng.toFixed(6)),
      );
    },
    [],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    import('leaflet').then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const center = (initLat.current != null && initLng.current != null)
        ? { lat: initLat.current, lng: initLng.current }
        : { lat: 51.505, lng: -0.09 };

      const map = L.map(containerRef.current!, { zoomControl: true }).setView(
        [center.lat, center.lng],
        initLat.current != null ? 13 : 5,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      if (initLat.current != null && initLng.current != null) {
        placeMarker(L, map, { lat: initLat.current, lng: initLng.current });
      }

      map.on('click', (e: { latlng: { lat: number; lng: number } }) => {
        placeMarker(L, map, e.latlng);
      });
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly map to a result and place pin
  const flyTo = useCallback((result: NominatimResult) => {
    const rlat = parseFloat(result.lat);
    const rlng = parseFloat(result.lon);
    setQuery(result.display_name.split(',').slice(0, 2).join(','));
    setShowDropdown(false);
    setResults([]);

    if (!mapRef.current) return;
    import('leaflet').then((L) => {
      mapRef.current.flyTo([rlat, rlng], 14, { duration: 1 });
      placeMarker(L, mapRef.current, { lat: rlat, lng: rlng });
    });
  }, [placeMarker]);

  // Debounced Nominatim search
  const handleSearch = (value: string) => {
    setQuery(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!value.trim()) { setResults([]); setShowDropdown(false); return; }

    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&addressdetails=0`,
          { headers: { 'Accept-Language': 'en' } },
        );
        const json: NominatimResult[] = await res.json();
        setResults(json);
        setShowDropdown(json.length > 0);
      } catch {
        // silently ignore network errors
      } finally {
        setSearching(false);
      }
    }, 400);
  };

  return (
    <div className="space-y-2">
      {/* Location search */}
      <div className="relative">
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-surface px-3 py-2.5 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-colors">
          {searching
            ? <CircleNotch size={15} className="text-neutral-400 shrink-0 animate-spin" />
            : <MagnifyingGlass size={15} className="text-neutral-400 shrink-0" />
          }
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            placeholder="Search for a location…"
            className="flex-1 text-sm text-primary placeholder:text-neutral-400 bg-transparent outline-none"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setResults([]); setShowDropdown(false); }}
              className="text-neutral-300 hover:text-neutral-500 transition-colors cursor-pointer text-xs leading-none"
            >✕</button>
          )}
        </div>

        {showDropdown && (
          <ul className="absolute top-full mt-1 left-0 right-0 z-9999 bg-surface border border-neutral-200 rounded-lg shadow-lg overflow-hidden divide-y divide-neutral-100">
            {results.map((r) => (
              <li key={r.place_id}>
                <button
                  type="button"
                  onClick={() => flyTo(r)}
                  className="w-full text-left px-3.5 py-2.5 text-sm text-primary hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {r.display_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map */}
      <div
        ref={containerRef}
        className="h-64 w-full rounded-xl overflow-hidden border border-neutral-200"
        style={{ zIndex: 0 }}
      />

      {lat != null && lng != null ? (
        <p className="text-xs text-neutral-500 font-mono">
          Pin: {lat.toFixed(6)}, {lng.toFixed(6)}
          <span className="ml-2 text-neutral-400">(drag pin or click map to move)</span>
        </p>
      ) : (
        <p className="text-xs text-neutral-400">Search a location or click the map to place the package pin</p>
      )}
    </div>
  );
}
