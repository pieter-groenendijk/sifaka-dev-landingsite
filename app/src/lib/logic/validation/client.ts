export type Judgement = {
  isGood: boolean,
  message: string,
}

export function judgeEmail(value: string): Judgement {
  if (value.length === 0) {
    return {
      isGood: false,
      message: "Enter an e-mail",
    };
  }

  const validEmailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!validEmailRegex.test(value)) {
    return {
      isGood: false,
      message: "Enter an valid e-mail",
    }
  }

  return {
    isGood: true,
    message: "",
  }
}

export function judgePassword(value: string): Judgement {
  if (value.length < 10) {
    return {
      isGood: false,
      message: "Minimum of 10 characters",
    }
  }

  return {
    isGood: true,
    message: "",
  }
}
