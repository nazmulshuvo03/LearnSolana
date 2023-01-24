import * as borsh from "@project-serum/borsh";

export class StudentIntro {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }

    borshInstructonSchema = borsh.struct([
        borsh.u8("variant"),
        borsh.str("name"),
        borsh.str("message")
    ]);

    static borshAccountSchema = borsh.struct([
        borsh.bool("initialized"),
        borsh.str("name"),
        borsh.str("message")
    ]);

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000);
        this.borshInstructonSchema.encode({ ...this, variant: 0 }, buffer);
        return buffer.slice(0, this.borshInstructonSchema.getSpan(buffer));
    }

    static deserialize(buffer?: Buffer): StudentIntro | null {
        if (!buffer) return null;

        try {
            const { name, message } = this.borshAccountSchema.decode(buffer);
            console.log("decoded buffer: ", { name, message });
            return new StudentIntro(name, message);
        } catch (e) {
            console.log("Deserialization error: ", e);
            console.log(buffer);
            return null;
        }
    }
}
