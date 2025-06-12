class FormatNumber {
  static formatNumber(value: string, mask: string): string {
    let maskedValue = "";
    let valueIndex = 0;
    let maskIndex = 0;
    while (maskIndex < mask.length) {
      if (mask[maskIndex] === "9") {
        if (valueIndex < value.length) {
          maskedValue += value[valueIndex++];
        } else {
          break;
        }
      } else {
        maskedValue += mask[maskIndex];
      }
      maskIndex++;
    }
    return maskedValue;
  }

  static formatPhone(value: string): string {
    return this.formatNumber(value, "(99) 9999-9999");
  }

  static formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Remove tudo que não for número
    const formattedValue = Number(numericValue) / 100;

    return formattedValue > 0
      ? formattedValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";
  };

  static parseCurrency = (formattedValue: string): number => {
    const numericValue = formattedValue
      .replace(/\./g, "") // Remove pontos (separadores de milhar)
      .replace(",", "."); // Substitui vírgula decimal por ponto

    return Number(numericValue);
  };

  static formatPrice = (value: number) => {
    const formatoMoeda = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

    return formatoMoeda;
  };

  static formatPlate = (plate: string, show: boolean) => {
    const str = show
      ? plate
      : plate
          .split("")
          .map((char, index) => (index >= 1 && index <= 6 ? "*" : char))
          .join("");

    return str.slice(0, 3) + "-" + str.slice(3);
  };
}

export default FormatNumber;
