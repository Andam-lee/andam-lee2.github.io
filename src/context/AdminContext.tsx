import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, googleProvider, db } from "../lib/firebase";

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  showLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  texts: Record<string, string>;
  getText: (id: string, fallbackText: string) => string;
  updateText: (id: string, newText: string, section?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isSaving: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Monitor Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsEditMode(true);
      } else {
        setIsEditMode(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore site_content changes in real-time
  useEffect(() => {
    try {
      const colRef = collection(db, "site_content");
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const map: Record<string, string> = {};
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data && typeof data.text === "string") {
              map[docSnap.id] = data.text;
            }
          });
          setTexts(map);
        },
        (error) => {
          console.warn("Firestore site_content snapshot error:", error);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn("Failed to subscribe to site_content:", err);
    }
  }, []);

  // Keyboard shortcut Ctrl+Shift+A or Cmd+Shift+A to toggle admin modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setShowLoginModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const openLoginModal = useCallback(() => setShowLoginModal(true), []);
  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);

  const getText = useCallback(
    (id: string, fallbackText: string): string => {
      return texts[id] !== undefined ? texts[id] : fallbackText;
    },
    [texts]
  );

  const updateText = useCallback(
    async (id: string, newText: string, section: string = "general") => {
      setIsSaving(true);
      // Optimistic update
      setTexts((prev) => ({ ...prev, [id]: newText }));
      try {
        const docRef = doc(db, "site_content", id);
        await setDoc(
          docRef,
          {
            id,
            text: newText,
            section,
            updatedAt: new Date().toISOString(),
            updatedBy: user?.email || user?.uid || "admin",
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating text in Firestore:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [user]
  );

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setShowLoginModal(false);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    setShowLoginModal(false);
  };

  const registerWithEmail = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
    setShowLoginModal(false);
  };

  const logout = async () => {
    await signOut(auth);
    setIsEditMode(false);
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isAdmin: !!user,
        isEditMode,
        toggleEditMode,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
        texts,
        getText,
        updateText,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        isSaving,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
