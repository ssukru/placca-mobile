type PlateCheckType = {
  result: boolean;
  error?: string | undefined;
};

const PlateCheck = (plate: string): PlateCheckType => {
  const specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacter.test(plate)) {
    return {
      result: false,
      error: "sadece rakam ve harf girişi yapınız.",
    };
  }

  if (plate.length < 7 || plate.length > 8) {
    return {
      result: false,
      error: "plakalar 7 veya 8 karakterli olabilir.",
    };
  }

  return { result: true };
};

export default PlateCheck;
