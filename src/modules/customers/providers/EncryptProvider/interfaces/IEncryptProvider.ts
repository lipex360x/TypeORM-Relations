export interface GenerateProps {
  password: string
}

export interface CompareProps {
  password: string
  hashed: string
}

export default interface IEncryptProvider {
  generate(data: GenerateProps): Promise<string>
  compare(data: CompareProps): Promise<boolean>
}
