module DS
{
    export class OEmbedProvider
    {
        public ApiEndpoint: string;
        public TemplateRegex: RegExp;
        public MaxWidth: number;
        public MaxHeight: number;
        public EmbedTag: IEmbedTag;
        
        constructor(apiEndpoint: string, templateRegex: RegExp, embedTag: IEmbedTag)
        {
            this.MaxHeight = 400;
            this.MaxWidth = 500;
            
            this.ApiEndpoint = apiEndpoint;
            this.TemplateRegex = templateRegex;
            this.EmbedTag = embedTag;
        }
    }
}