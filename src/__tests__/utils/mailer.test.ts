import { generateWelcomeMail } from "../../utils/mailer";

describe("Mailer Utils", () => {
  describe("generateWelcomeMail", () => {
    it("should generate welcome email with correct subject", () => {
      const result = generateWelcomeMail();

      expect(result.subject).toBe("Bienvenue sur PainTracker !");
    });

    it("should generate welcome email with text content", () => {
      const result = generateWelcomeMail();

      expect(result.text).toBeDefined();
      expect(typeof result.text).toBe("string");
      expect(result.text).toContain("Bienvenue sur PainTracker !");
      expect(result.text).toContain("Bonjour,");
      expect(result.text).toContain(
        "Votre compte vient d'être créé avec succès"
      );
      expect(result.text).toContain("Suivi simple et rapide de vos douleurs");
      expect(result.text).toContain("Historique et évolution détaillée");
      expect(result.text).toContain("Accès à l'analyse IA");
      expect(result.text).toContain("https://paintracker.app");
      expect(result.text).toContain("L'équipe PainTracker");
    });

    it("should generate welcome email with HTML content", () => {
      const result = generateWelcomeMail();

      expect(result.html).toBeDefined();
      expect(typeof result.html).toBe("string");
      expect(result.html).toContain("<!DOCTYPE html>");
      expect(result.html).toContain("<html>");
      expect(result.html).toContain("<body");
      expect(result.html).toContain("Bienvenue sur PainTracker !");
      expect(result.html).toContain("Bonjour,");
      expect(result.text).toContain(
        "Votre compte vient d'être créé avec succès"
      );
      expect(result.html).toContain(
        "<li>Suivi simple et rapide de vos douleurs</li>"
      );
      expect(result.html).toContain(
        "<li>Historique et évolution détaillée</li>"
      );
      expect(result.html).toContain(
        "<li>Accès à l'analyse IA (selon votre abonnement)</li>"
      );
      expect(result.html).toContain("https://paintracker.app");
      expect(result.html).toContain("L'équipe PainTracker");
    });

    it("should return both text and HTML versions", () => {
      const result = generateWelcomeMail();

      expect(result).toHaveProperty("subject");
      expect(result).toHaveProperty("text");
      expect(result).toHaveProperty("html");

      expect(result.subject).toBe("Bienvenue sur PainTracker !");
      expect(result.text).toBeTruthy();
      expect(result.html).toBeTruthy();
    });

    it("should include proper HTML structure and styling", () => {
      const result = generateWelcomeMail();

      expect(result.html).toContain("font-family: Arial, sans-serif");
      expect(result.html).toContain("background: #f8fafc");
      expect(result.html).toContain("color: #2563eb");
      expect(result.html).toContain("border-radius: 12px");
      expect(result.html).toContain("box-shadow: 0 2px 8px #e0e7ef");
      expect(result.html).toContain("background: #2563eb");
      expect(result.html).toContain("color: #fff");
      expect(result.html).toContain("border-radius: 6px");
      expect(result.html).toContain("color: #64748b");
    });

    it("should include proper call-to-action button", () => {
      const result = generateWelcomeMail();

      expect(result.html).toContain('<a href="https://paintracker.app"');
      expect(result.html).toContain("Accéder à PainTracker");
      expect(result.html).toContain(
        'style="background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;"'
      );
    });

    it("should include disclaimer text", () => {
      const result = generateWelcomeMail();

      expect(result.text).toContain(
        "Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message."
      );
      expect(result.html).toContain(
        "Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message."
      );
    });
  });
});
