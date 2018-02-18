import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

export type UserModel = mongoose.Document & {
    email: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: Date,
    parent: string,
    isChild: boolean,
    role: string,
    childRole: string,
    userView: string,

    tokens: AuthToken[],

    profile: {
        firstName: string,
        lastName: string,
        title: string,
        companyName: string,
        companyLogo: string,
        phone: string,
        address: string,
        city: string,
        state: string,
        region: string,
        businessType: string,
        profileImage: string,
        cart: boolean,
    },

    comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
    gravatar: (size: number) => string,
};

export type AuthToken = {
    accessToken: string,
    kind: string
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    parent: String,
    isChild: Boolean,
    profile: {
        firstName: String,
        lastName: String,
        title: String,
        companyName: String,
        companyLogo: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        region: String,
        businessType: String,
        profileImage: String,
        cart: Boolean,
    },
    role: {
        type: String,
        enum: ['restaurant', 'supplier', 'supplier-restaurant'],
        default: 'restaurant',
        required: true
    },
    childRole: String,
    userView: {
        type: String,
        enum: ['restaurant', 'supplier'],
        default: 'restaurant'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    tokens: Array,
}, {
        timestamps: true
    });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
            if (err) return reject(err);
            else if (!isMatch) reject(new Error('Incorrect Password'));
            else resolve(isMatch);
        });
    });
    // bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    //     console.log({ isMatch });
    //     cb(err, isMatch);
    // });
};

userSchema.methods.validPassword = function (passwordAttempt: string) {
    return bcrypt.compareSync(passwordAttempt, this.password);
}


/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema);
export default User;