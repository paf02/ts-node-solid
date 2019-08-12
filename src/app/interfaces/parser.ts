export default interface Parser<OutFormat, InFormat> {
    parse: (value: InFormat) => OutFormat;
}