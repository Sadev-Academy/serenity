-- Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    category TEXT NOT NULL, -- 'Massage', 'Facial', 'Body Treatments'
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create Staff Table
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    date_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'PENDING' NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create Policies (Select is public for services/staff, insert is public for appointments)
CREATE POLICY "Allow public read access to services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read access to staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- Seed Staff Data
INSERT INTO public.staff (id, name, role, image_url) VALUES
('6fa44b3f-1d48-43d9-9524-cc090f9b6910', 'Sarah Jenkins', 'Lead Massage Therapist', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'),
('e3794bfd-4677-4976-b6fb-c5c5de9e013f', 'Michael Chen', 'Senior Esthetician', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600'),
('7ac17e44-d8ad-4c66-b3ea-ef50dfccf6f1', 'Elena Rostova', 'Holistic Body Practitioner', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, image_url = EXCLUDED.image_url;

-- Seed Services Data
INSERT INTO public.services (id, name, description, price, duration, category, image_url) VALUES
('b19688df-b5f7-410a-81a1-9b63a232ab81', 'Swedish Massage', 'A classic full-body massage using long, gliding strokes to improve circulation and melt away daily stress.', 120.00, 60, 'Massage', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800'),
('d5089304-4b5c-42cb-b1b7-957723793e23', 'Deep Tissue Massage', 'Focuses on realigning deeper layers of muscles. Ideal for chronic aches, pain, and contracted areas.', 160.00, 90, 'Massage', 'https://images.unsplash.com/photo-1519813572847-f70b2fe4d7e3?auto=format&fit=crop&q=80&w=800'),
('c5354b6c-e5e3-46bc-81bf-4e08a6b1df30', 'Hot Stone Therapy', 'Smooth, heated basalt stones are placed on key points of the body to deeply relax muscles and balance energy.', 150.00, 75, 'Massage', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'),
('f6110f0f-df9f-4318-97ec-037f00fa32e1', 'Radiance Facial', 'A custom botanical treatment designed to restore natural glow, deeply cleanse, and hydrate the skin.', 130.00, 60, 'Facial', 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'),
('a59b3bc5-de21-4328-98de-1ffab30799f2', 'Anti-Aging Collagen Treatment', 'An advanced facial using active collagen serums to plump fine lines, improve elasticity, and firm facial contours.', 170.00, 75, 'Facial', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'),
('e6a8d6b8-2a20-4e31-8f55-b040a3203f19', 'Detoxifying HydraFacial', 'Patented technology to cleanse, extract, and hydrate. Outstandingly effective for clearing pores and polishing skin.', 110.00, 45, 'Facial', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'),
('9d91f24d-b9aa-4033-bbde-86a0b9a896d8', 'Organic Sugar Scrub', 'A full-body exfoliation with organic cane sugar and essential oils, leaving your skin silky smooth and radiant.', 115.00, 60, 'Body Treatments', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'),
('2f9f1b4a-a9bb-4b3b-8521-7faef8e94a82', 'Detoxifying Seaweed Wrap', 'A warm seaweed body mask rich in vitamins and minerals to detoxify, firm, and hydrate the skin.', 145.00, 75, 'Body Treatments', 'https://images.unsplash.com/photo-1519813572847-f70b2fe4d7e3?auto=format&fit=crop&q=80&w=800'),
('4e2f8b8c-c3bb-4d5b-9521-8faef8e94a83', 'Herbal Body Polish', 'A gentle skin-refining treatment using therapeutic herbs to polish, nourish, and revitalize the entire body.', 125.00, 60, 'Body Treatments', 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, duration = EXCLUDED.duration, category = EXCLUDED.category, image_url = EXCLUDED.image_url;
