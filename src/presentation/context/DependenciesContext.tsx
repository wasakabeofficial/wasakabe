/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { SubmitContactUseCase } from "../../application";
import { EmailValidationService } from "../../application";
import {
  SupabaseContactRepository,
  BackendEmailVerifier,
  GoogleDnsMxChecker,
} from "../../infrastructure";
import type { IContactRepository, IEmailValidationService } from "../../core";

/* ─── Tipos ─── */

export interface Dependencies {
  submitContactUseCase: SubmitContactUseCase;
  contactRepository: IContactRepository;
  emailValidationService: IEmailValidationService;
}

const DependenciesContext = createContext<Dependencies | null>(null);

/* ─── Provider (Composition Root) ─── */

export function DependenciesProvider({ children }: { children: ReactNode }) {
  const deps = useMemo<Dependencies>(() => {
    const repository: IContactRepository = new SupabaseContactRepository();
    const verificationService: IEmailValidationService =
      new EmailValidationService([
        new BackendEmailVerifier(),
        new GoogleDnsMxChecker(),
      ]);
    const submitContactUseCase = new SubmitContactUseCase(
      repository,
      verificationService,
    );
    return {
      submitContactUseCase,
      contactRepository: repository,
      emailValidationService: verificationService,
    };
  }, []);

  return (
    <DependenciesContext.Provider value={deps}>
      {children}
    </DependenciesContext.Provider>
  );
}

/* ─── Hook ─── */

export function useDependencies(): Dependencies {
  const ctx = useContext(DependenciesContext);
  if (!ctx) {
    throw new Error(
      "useDependencies must be used within <DependenciesProvider>",
    );
  }
  return ctx;
}
