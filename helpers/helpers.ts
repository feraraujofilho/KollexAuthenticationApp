import zxcvbn from 'zxcvbn'

export const getPasswordStrengthScore = (password: string): number => {
    const analysisPassword = zxcvbn(password)
    return analysisPassword.score
}

export const getBarColor = (score: number) => {
    if (score <= 1) {
        return "#FF6666"
    }
    if (score === 2) {
        return "#FFB266"
    }
    if (score === 3) {
        return "#0066CC"
    }
    return "#009900"
}