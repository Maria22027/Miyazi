import { NextResponse } from 'next/server';
import { database, ref, set, push } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const leadData = await request.json();
    
    // Cria uma nova referência no Firebase
    const leadsRef = ref(database, 'leads');
    const newLeadRef = push(leadsRef);
    
    await set(newLeadRef, {
      ...leadData,
      timestamp: new Date().toISOString(),
      status: 'new'
    });

    return NextResponse.json({ message: 'Lead salvo com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return NextResponse.json({ error: 'Erro ao salvar lead' }, { status: 500 });
  }

  
}

