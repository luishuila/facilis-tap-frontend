
export interface CategoryDto {
    id:number;  
    name: string;
    description?: string;
    img?: string;
  }
  
  export interface SubcategoryDto {
    id: string;
    name: string;
    description?: string;
    language: string;
    isAssete: boolean;
    img?: string;
    category?: CategoryDto;
  }
  