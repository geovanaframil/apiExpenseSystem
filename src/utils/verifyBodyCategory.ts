function verifyBodyCategory(body: any): { isValid: boolean; message: string } {
  if (!body.name || typeof body.name !== "string") {
    return {
      isValid: false,
      message: "Campo nome é obrigatório e deve receber uma string",
    };
  }
  return { isValid: true, message: "" };
}

export default verifyBodyCategory;
