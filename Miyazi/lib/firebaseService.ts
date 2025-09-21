// lib/firebaseService.ts
import {
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
  database,
  ref,
  set,
  push
} from './firebase';

export async function createProperty(formData: any, images: string[]) {
  try {
    const imageUrls: string[] = [];

    for (const uri of images) {
      const response = await fetch(uri);
      const blob = await response.blob();

      const fileRef = storageRef(
        storage,
        `properties/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`
      );
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      imageUrls.push(url);
    }

    const propertyRef = push(ref(database, 'properties'));
    const propertyData = {
      ...formData,
      images: imageUrls,
      id: propertyRef.key,
      createdAt: new Date().toISOString(),
      status: 'ativo',
    };

    await set(propertyRef, propertyData);

    return { success: true, id: propertyRef.key };
  } catch (error: any) {
    console.error('Erro ao criar imóvel:', error);
    return { success: false, error: error.message || 'Erro desconhecido' };
  }
}
