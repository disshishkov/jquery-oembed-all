module DS
{
    export interface IOptions
    {
        MaxWidth: number;
        MaxHeight: number;
        IsIncludeHandle: boolean;
        IsReplaceLink: boolean;
        OnProviderNotFound: Function;
        OnBeforeEmbed: Function;
        OnAfterEmbed: Function;
        OnEmbed: Function;
    }
}