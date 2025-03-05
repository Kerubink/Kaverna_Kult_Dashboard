import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/database/firebase_config";

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string; // "artist", "graphics", etc.
}

/**
 * Registra o usuário no Firebase Auth e, em seguida, salva os dados do usuário
 * na coleção "users" do Firestore com status "pendente".
 * @param data Dados do usuário
 * @returns UID do usuário criado
 */
export async function registerUser(data: RegisterData): Promise<string> {
  const auth = getAuth();
  const { name, email, phone, password, role, ...rest } = data;

  // Cria o usuário no Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Cria o registro do usuário no Firestore com status "pendente"
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    phone,
    role,
    ...rest,
    createdAt: new Date(),
    // Adicione outros campos padrão se necessário
  });

  return uid;
}
