
import IEncryptProvider, { CompareProps, GenerateProps } from '../interfaces/IEncryptProvider'

export default class FakeEncryptProvider implements IEncryptProvider {
  async generate ({ password }:GenerateProps): Promise<string> {
    return password
  }

  async compare ({ password, hashed }:CompareProps): Promise<boolean> {
    return password === hashed
  }
}
