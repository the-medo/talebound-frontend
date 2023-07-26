export enum ImageModalMode {
  Insert,
  Update,
}

export const ImageModalAction: Record<ImageModalMode, string> = {
  [ImageModalMode.Insert]: 'Add',
  [ImageModalMode.Update]: 'Update',
};
