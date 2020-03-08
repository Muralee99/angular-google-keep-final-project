export class Category {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categoryCreatedBy: string;
  categoryCreationDate: Date = new Date();

  constructor(private categoryName1: string, private categoryDescription1: string, 
    private categoryCreatedBy1: string, private categoryCreationDate1: Date) 
    {
      this.categoryName = categoryName1;
      this.categoryDescription = categoryDescription1;
      this.categoryCreatedBy = categoryCreatedBy1;
      this.categoryCreationDate = categoryCreationDate1;
    }
}
