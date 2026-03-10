import { motion, stagger, type Variants } from "motion/react";
import type { Page } from "../App";
import { PaddedContainer } from "../components/Containers";
import * as z from "zod";
import type React from "react";
import { useState } from "react";
import { Checkbox, TextFormItem } from "../components/formItems";
import Button from "../components/Button";
import useFormspree from "../hooks/useFormspree";

/// ### Container Animation ###
const containerVariant: Variants = {
  init: {},
  view: {
    transition: {
      delayChildren: stagger(0.03),
    },
  },
};

const containerItemVariant: Variants = {
  init: { opacity: 0, x: -50 },
  view: { opacity: 1, x: 0 },
};
/// ### END CONTAINER ANIMATION ###

interface ConsentFormProps {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  formId: string;
}

/// Gem Consent Form
const GemForm = (props: ConsentFormProps) => {
  const ConsentGemFormItems = z.object({
    name: z.string().nonempty("Please provide your name"),
    phone: z
      .string()
      .regex(
        /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Please provide a valid phone #",
      ),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email",
      )
      .nonempty("Please provide a valid email"),
    date: z.date().nonoptional("Please provide a signature date"),
    signature: z.string().nonempty("Please provide your signature"),
  });
  type ConsentGemFormItems = z.infer<typeof ConsentGemFormItems>;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formSpree = useFormspree<ConsentGemFormItems>(props.formId);

  //when the form is submitted
  const formSubmitted = (data: FormData) => {
    const date = new Date(
      (data.get("date") as string) ?? new Date().toDateString(),
    );

    const consentUnsafe = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      date: date,
      signature: data.get("signature"),
    };

    console.log(consentUnsafe);

    try {
      const consentData = ConsentGemFormItems.parse(consentUnsafe);
      setErrors({});
      formSpree.send(consentData).then((req) => {
        if (req && req.ok) {
          props.setSubmitted(true);
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        error.issues.forEach((err) => {
          const key = err.path[0].toString();

          console.log(err);
          newErrors[key] = err.message;
        });

        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <motion.div className="flex flex-col gap-4 items-start text-lg text-primary pb-8">
        <motion.p variants={containerItemVariant}>
          By completing and signing this consent form I am agreeing to the
          following:
        </motion.p>

        <motion.ul
          variants={containerVariant}
          className="list-disc px-12 py-4 flex flex-col gap-2 bg-white text-black rounded-2xl shadow-md shadow-black/2"
        >
          <motion.li variants={containerItemVariant}>
            I (the client) consent to having a tooth gem bonded to my tooth
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) agree to follow the aftercare procedures given to me
            by the technician.
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) have alerted my technician of any medical conditions
            I may have.
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) acknowledge and understand that tooth gems do not
            adhere to crowns, caps, porcelain veneers or composite veneers, or
            any other dental material. Tooth gems are best placed onto natural
            teeth to ensure longevity.
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) understand that tooth gems are better placed high on
            the tooth or in the centre, as the edges of the teeth sink into
            food. If you decide you want your tooth gem on the lowest point of
            your tooth, your technician can't ensure longevity and is not
            responsible if the tooth gem falls off. Your technician will advise
            you on the best recommendation of placement in relationship to the
            specific bite and/or positioning of your teeth.
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) understand that tooth gems are non-invasive. They do
            not cause damage to the tooth or enamel and are both semi-permanent
            and reversible. Once the tooth gem has been applied, there may be
            some remaining adhesive surrounding the tooth gem.
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) understand tooth gems can last anywhere from 4-12
            months. If I (the client) wish to remove the tooth gem before it
            naturally falls off, it has to be done via a dental appointment.
            Once the tooth gem does fall off, there may still be some residual
            bonding material remaining on the tooth. This can easily be removed
            by your dentist.
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) agree to not remove the gem myself and if I (the
            client) want to remove the gem an appointment with my general
            dentist must be booked at the expense of myself (the client).
          </motion.li>
          <motion.li variants={containerItemVariant}>
            I (the client) take full responsibility for my tooth gem. Your
            technician is not liable for any issues that may arise following my
            tooth gem procedure. Any costs associated with removing my tooth gem
            is a cost I (the client) have to take responsibility for.
          </motion.li>
        </motion.ul>

        <motion.p variants={containerItemVariant}>
          I have read all the above and agree and consent to getting a tooth
          gem:
        </motion.p>
      </motion.div>

      <form
        className="flex flex-wrap w-full gap-12 items-end basis-3/4 pb-12"
        onSubmit={(e) => {
          e.preventDefault();
          formSubmitted(new FormData(e.currentTarget));
        }}
      >
        <div className="flex w-full justify-between gap-12 items-end">
          <TextFormItem
            error={errors["name"]}
            required={true}
            name="name"
            placeHolder="Jane Doe..."
            size="half"
          >
            Full Name
          </TextFormItem>
          <TextFormItem
            error={errors["phone"]}
            required={true}
            name="phone"
            type="tel"
            placeHolder="(555) 555-5555"
            size="half"
          >
            Phone Number
          </TextFormItem>
          <TextFormItem
            error={errors["email"]}
            required={true}
            name="email"
            type="email"
            placeHolder="example@email.com"
            size="half"
          >
            Email Address
          </TextFormItem>
        </div>

        <div className="flex w-full justify-between items-end">
          <TextFormItem
            error={errors["signature"]}
            required={true}
            name="signature"
            placeHolder="Signature"
            size="half"
          >
            Signature
          </TextFormItem>
          <TextFormItem
            error={errors["date"]}
            required={true}
            readOnly={true}
            type="date"
            name="date"
            placeHolder=""
            value={new Date().toISOString().split("T")[0]}
            size="half"
          >
            Date Signed
          </TextFormItem>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

const VideoItems = (props: ConsentFormProps) => {
  const ConsentVideoItems = z.object({
    name: z.string().nonempty("Please provide your name"),
    phone: z
      .string()
      .regex(
        /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Please provide a valid phone #",
      ),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email",
      )
      .nonempty("Please provide a valid email"),
    date: z.date().nonoptional("Please provide a signature date"),
    signature: z.string().nonempty("Please provide your signature"),
    event: z.string().nonempty("Please provide the event name"),
    underage: z.boolean().optional(),
    consent: z
      .string()
      .refine((val) => val === "true", {
        message: "Check this box to continue",
      })
      .transform((val) => val === "true"),
  });
  type ConsentVideoItems = z.infer<typeof ConsentVideoItems>;

  const UnderageConsentVideoItems = z.object({
    guardsignature: z.string().nonempty("Please provide your name"),
  });
  type UnderageConsentVideoItems = z.infer<typeof UnderageConsentVideoItems>;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formSpree = useFormspree<ConsentVideoItems & UnderageConsentVideoItems>(
    props.formId,
  );

  const [underAge, setUnderAge] = useState<boolean>(false);

  //when the form is submitted
  const formSubmitted = (data: FormData) => {
    const date = new Date(
      (data.get("date") as string) ?? new Date().toDateString(),
    );

    const consentUnsafe = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      event: data.get("event"),
      date: date,
      signature: data.get("signature"),
      consent: data.get("consent") || "false",
    };

    const underageConsentUnsafe = {
      guardsignature: underAge ? data.get("guardsignature") : "N/A",
    };

    try {
      const consentDataParse = ConsentVideoItems.safeParse(consentUnsafe);
      const underageDataParse = UnderageConsentVideoItems.safeParse(
        underageConsentUnsafe,
      );

      const errors = [];
      if (!consentDataParse.success) errors.push(consentDataParse.error);

      if (!underageDataParse.success) errors.push(underageDataParse.error);

      if (errors.length > 0)
        throw new z.ZodError(errors.flatMap((e) => e.issues));

      const consentData = consentDataParse.data!;
      const underageData = underageDataParse.data!;
      const data: ConsentVideoItems & UnderageConsentVideoItems = {
        ...consentData,
        ...underageData,
      };

      setErrors({});
      formSpree.send(data).then((req) => {
        if (req && req.ok) {
          props.setSubmitted(true);
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        error.issues.forEach((err) => {
          const key = err.path[0].toString();

          console.log(err);
          newErrors[key] = err.message;
        });

        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <motion.div className="flex flex-col gap-4 items-start text-lg text-primary pb-8">
        <motion.p variants={containerItemVariant}>
          By completing and signing this consent form I am agreeing to the
          following:
        </motion.p>

        <motion.ol
          variants={containerVariant}
          className="list-decimal px-12 py-4 flex flex-col gap-2 bg-white text-black rounded-2xl shadow-md shadow-black/2"
        >
          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Consent to Use of Media</span>
            <div className="px-4 py-2">
              <p>
                I, the undersigned, hereby grant Luxe Smile Lounge, LLC, its
                affiliates, representatives, agents, employees, and assigns the
                irrevocable right to record, photograph, film, or capture my
                image, voice, and/or likeness through video, photographs, or
                audio recordings (collectively, "Media"). This includes all
                forms of media, including but not limited to digital images,
                audio, and video.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Purpose of Media</span>
            <div className="px-4 py-2">
              <p>
                I understand and consent that the Media may be used for
                promotional, advertising, educational, or other purposes by Luxe
                Smile Lounge, LLC, including but not limited to:
              </p>

              <ol className="list-disc px-12 py-2 text-lg">
                <li>Social media platforms</li>
                <li>Websites</li>
                <li>Printed materials (brochures, flyers, posters, etc.)</li>
                <li>Videos for promotional, marketing, or educational use</li>
                <li>Public displays or exhibitions</li>
              </ol>

              <p>
                The Media may be used in any current or future media, including
                print, digital, television, or online media, worldwide, in
                perpetuity.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Ownership and Rights</span>
            <div className="px-4 py-2">
              <p>
                I acknowledge that all rights to the Media, including
                copyrights, belong exclusively to Luxe Smile Lounge, LLC. I
                waive any right to inspect or approve the final use of the
                Media, and I further understand that I will not be entitled to
                any compensation or payment for the use of my likeness, voice,
                or image.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">No Obligation to Use Media</span>
            <div className="px-4 py-2">
              <p>
                I understand that Luxe Smile Lounge, LLC is under no obligation
                to use any Media created from this consent, and there is no
                guarantee that my image or likeness will appear in any
                promotional materials or other media.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Privacy and Confidentiality</span>
            <div className="px-4 py-2">
              <p>
                I acknowledge that my participation in the photo and video
                recording is voluntary, and I understand that any personal
                information provided will be kept confidential and used only in
                accordance with privacy laws and regulations.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Release from Liability</span>
            <div className="px-4 py-2">
              <p>
                I hereby release, waive, and hold harmless Luxe Smile Lounge,
                LLC, its employees, agents, contractors, and any other parties
                involved in the production, distribution, or use of the Media,
                from any liability, claims, demands, or causes of action arising
                out of the use of my image, voice, or likeness, including but
                not limited to claims for defamation, invasion of privacy, or
                misappropriation of rights.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Acknowledgment of Consent</span>
            <div className="px-4 py-2">
              <p>
                By signing below, I acknowledge that I have read and fully
                understand the terms of this Photo and Video Consent Form. I
                voluntarily agree to the use of my image, voice, and likeness in
                accordance with the terms described above.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Minors</span>
            <div className="px-4 py-2">
              <p>
                If the Participant is under the age of 18, a parent or legal
                guardian must sign this form.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Consent for Recording</span>
            <div className="px-4 py-2">
              <p>
                I consent to the recording of my voice, image, and likeness as
                described above. I understand that I may withdraw consent at any
                time by notifying Luxe Smile Lounge, LLC in writing, but such
                withdrawal will not affect the use of the Media prior to the
                withdrawal.
              </p>
            </div>
          </motion.li>
        </motion.ol>

        <motion.p variants={containerItemVariant}>
          I have read all the above and agree and consent to getting a tooth
          gem:
        </motion.p>
      </motion.div>

      <form
        className="flex flex-wrap w-full gap-12 items-end basis-3/4 pb-12"
        onSubmit={(e) => {
          e.preventDefault();
          formSubmitted(new FormData(e.currentTarget));
        }}
      >
        <div className="flex w-full justify-between gap-12 items-end">
          <TextFormItem
            error={errors["name"]}
            required={true}
            name="name"
            placeHolder="Jane Doe..."
            size="half"
          >
            Participant's Full Name
          </TextFormItem>
          <TextFormItem
            error={errors["phone"]}
            required={true}
            name="phone"
            type="tel"
            placeHolder="(555) 555-5555"
            size="half"
          >
            Phone Number
          </TextFormItem>
        </div>

        <div className="flex w-full justify-between items-end">
          <TextFormItem
            error={errors["email"]}
            required={true}
            name="email"
            type="email"
            placeHolder="example@email.com"
            size="half"
          >
            Email Address
          </TextFormItem>
          <TextFormItem
            error={errors["event"]}
            required={true}
            name="event"
            placeHolder="Gem placement..."
            size="half"
          >
            Event/Project Name
          </TextFormItem>
        </div>

        <div className="flex w-full justify-start gap-16 items-end">
          <Checkbox error={errors["consent"]} name="consent">
            Yes, I consent to the recording and use of my image, voice, and
            likeness.
          </Checkbox>

          <Checkbox
            onValueChange={(checked) => {
              setUnderAge(checked);
            }}
            name="underage"
          >
            Are you under 18 years of age?
          </Checkbox>
        </div>

        {underAge && (
          <>
            <TextFormItem
              error={errors["guardsignature"]}
              required={true}
              name="guardsignature"
              placeHolder="Your full legal name..."
              size="half"
            >
              Parent or Legal Guardian Signature
            </TextFormItem>
          </>
        )}

        <div className="flex w-full justify-between items-end">
          <TextFormItem
            error={errors["signature"]}
            required={true}
            name="signature"
            placeHolder="Your full legal name..."
            size="half"
          >
            Signature
          </TextFormItem>
          <TextFormItem
            error={errors["date"]}
            required={true}
            readOnly={true}
            type="date"
            name="date"
            placeHolder=""
            value={new Date().toISOString().split("T")[0]}
            size="half"
          >
            Date Signed
          </TextFormItem>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

const TeethWhitening = (props: ConsentFormProps) => {
  const ConsentTeethWhitening = z.object({
    name: z.string().nonempty("Please provide your name"),
    phone: z
      .string()
      .regex(
        /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Please provide a valid phone #",
      ),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email",
      )
      .nonempty("Please provide a valid email"),
    date: z.date().nonoptional("Please provide a signature date"),
    signature: z.string().nonempty("Please provide your signature"),
  });
  type ConsentTeethWhitening = z.infer<typeof ConsentTeethWhitening>;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formSpree = useFormspree<ConsentTeethWhitening>(props.formId);

  //when the form is submitted
  const formSubmitted = (data: FormData) => {
    const date = new Date(
      (data.get("date") as string) ?? new Date().toDateString(),
    );

    const consentUnsafe = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      date: date,
      signature: data.get("signature"),
    };

    console.log(consentUnsafe);

    try {
      const consentData = ConsentTeethWhitening.parse(consentUnsafe);
      setErrors({});
      formSpree.send(consentData).then((req) => {
        if (req && req.ok) {
          props.setSubmitted(true);
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        error.issues.forEach((err) => {
          const key = err.path[0].toString();

          console.log(err);
          newErrors[key] = err.message;
        });

        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <motion.div className="flex flex-col gap-4 items-start text-lg text-primary pb-8">
        <motion.p variants={containerItemVariant}>
          The purpose of this form is to obtain your consent for teeth whitening
          treatment. Teeth whitening procedures involve the use of hydrogen or
          carbamide peroxide to help lighten the color of your teeth.{" "}
          <b>
            Please review the following information carefully before signing.
          </b>
        </motion.p>

        <motion.ol
          variants={containerVariant}
          className="list-decimal px-12 py-4 flex flex-col gap-2 bg-white text-black rounded-2xl shadow-md shadow-black/2"
        >
          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Description of Procedure</span>
            <div className="px-4 py-2">
              <p>
                Teeth whitening involves the application of a whitening agent,
                such as hydrogen peroxide or carbamide peroxide, to the surface
                of your teeth. The procedure aims to lighten the teeth by
                breaking down stains and discoloration caused by food, drink,
                smoking, or aging.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Possible Risks and Side Effects</span>
            <div className="px-4 py-2">
              <p>
                While teeth whitening is generally safe, however there are some
                potential risks and side effects, including:
              </p>

              <ol className="list-disc px-12 py-2 text-lg">
                <li>
                  Tooth Sensitivity: Some patients may experience temporary
                  increased tooth sensitivity to hot, cold, or sweet foods and
                  beverages.
                </li>
                <li>
                  Gum Irritation: There is a possibility of gum irritation if
                  the whitening agent comes into contact with your gums. It
                  usually goes away within one hour and can easily be treated
                  with vitamin e oil.
                </li>
                <li>
                  Uneven Whitening: <b>Results may vary</b>, and some areas of
                  your teeth may not lighten as evenly as others. This can occur
                  due to pre-existing dental restorations, such as crowns,
                  veneers, or fillings and other anatomical features of your
                  teeth (example: canines are always darker than the rest of
                  your teeth).
                </li>
              </ol>

              <p className="font-bold">
                If you experience any discomfort or unusual side effects, please
                notify us immediately.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Contraindications</span>
            <div className="px-4 py-2">
              <p>Teeth whitening is not recommended for individuals who are:</p>

              <ol className="list-disc px-12 py-2 text-lg">
                <li>Pregnant or breastfeeding</li>
                <li>Under 18 years old</li>
                <li>
                  Have untreated cavities, gum disease, or other oral health
                  issues
                </li>
                <li>
                  Have hypersensitivity or other known adverse reactions to
                  whitening agents
                </li>
              </ol>

              <p className="font-bold">
                Please inform us if any of the above conditions apply to you.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Results and Expectations:</span>
            <div className="px-4 py-2">
              <p>
                While teeth whitening can significantly improve the color of
                your teeth, results will vary depending on individual factors
                such as the severity of staining, the condition of your teeth,
                and your lifestyle choices (e.g., diet, smoking).{" "}
                <b>
                  The effects of whitening treatments are not permanent and may
                  require touch-ups in the future.
                </b>{" "}
                It is highly recommended that you purchase a good electric
                toothbrush and maintain proper oral hygiene to prolong your
                results!
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Consent to Treatment</span>
            <div className="px-4 py-2">
              <p>
                I, the undersigned, acknowledge that I have been informed of the
                nature of the teeth whitening procedure, its potential risks,
                and side effects. I understand that results may vary, and I
                accept that my teeth may not achieve the desired level of
                whiteness.
              </p>
              <p>
                By signing this form, I consent to undergo the teeth whitening
                treatment and accept full responsibility for any potential
                complications or side effects that may arise.
              </p>
            </div>
          </motion.li>

          <motion.li variants={containerItemVariant}>
            <span className="font-bold">Acknowledgment</span>
            <div className="px-4 py-2">
              <p>
                I certify that I have provided accurate information about my
                health and medical history to the best of my knowledge. I
                understand that withholding information or providing inaccurate
                details could affect my treatment outcome.
              </p>
            </div>
          </motion.li>
        </motion.ol>
      </motion.div>

      <form
        className="flex flex-wrap w-full gap-12 items-end basis-3/4 pb-12"
        onSubmit={(e) => {
          e.preventDefault();
          formSubmitted(new FormData(e.currentTarget));
        }}
      >
        <div className="flex w-full justify-between gap-12 items-end">
          <TextFormItem
            error={errors["name"]}
            required={true}
            name="name"
            placeHolder="Jane Doe..."
            size="half"
          >
            Full Name
          </TextFormItem>
          <TextFormItem
            error={errors["phone"]}
            required={true}
            name="phone"
            type="tel"
            placeHolder="(555) 555-5555"
            size="half"
          >
            Phone Number
          </TextFormItem>
          <TextFormItem
            error={errors["email"]}
            required={true}
            name="email"
            type="email"
            placeHolder="example@email.com"
            size="half"
          >
            Email Address
          </TextFormItem>
        </div>

        <div className="flex w-full justify-between items-end">
          <TextFormItem
            error={errors["signature"]}
            required={true}
            name="signature"
            placeHolder="Signature"
            size="half"
          >
            Signature
          </TextFormItem>
          <TextFormItem
            error={errors["date"]}
            required={true}
            readOnly={true}
            type="date"
            name="date"
            placeHolder=""
            value={new Date().toISOString().split("T")[0]}
            size="half"
          >
            Date Signed
          </TextFormItem>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

interface FormItem {
  content: React.ReactNode;
  value: string;
  friendly: string;
}

const ConsentForms = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const forms: FormItem[] = [
    {
      value: "gem",
      content: <GemForm setSubmitted={setIsFormSubmitted} formId="UNKNOWN" />,
      friendly: "Gem Consent Form",
    },
    {
      value: "video",
      content: (
        <VideoItems setSubmitted={setIsFormSubmitted} formId="UNKNOWN" />
      ),
      friendly: "Video Consent Form",
    },
    {
      value: "teeth",
      content: (
        <TeethWhitening setSubmitted={setIsFormSubmitted} formId="UNKNOWN" />
      ),
      friendly: "Teeth Whitening Consent Form",
    },
  ];

  const [currentForm, setCurrentForm] = useState<string>("gem");

  return (
    <div className="flex flex-col gap-20">
      <PaddedContainer className="pt-12 flex flex-col">
        <motion.div
          variants={containerVariant}
          initial="init"
          animate="view"
          className="gap-8 flex flex-col"
        >
          <motion.h1
            variants={containerItemVariant}
            className="text-primary text-5xl font-bold tracking-wider"
          >
            Consent Forms
          </motion.h1>

          {isFormSubmitted ? (
            <div className="flex flex-col w-full items-center">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-green-200 shadow-md w-fit flex flex-col items-center p-8 py-4 gap-4"
              >
                <h1 className="text-4xl uppercase font-bold text-green-800">
                  Thank You!
                </h1>
                <p className="text-2xl text-green-700">
                  We appreciate your submission and will be in contact with you
                  soon!
                </p>
                <Button
                  className="bg-green-300 text-green-900 rounded-md px-4 py-2 text-lg font-bold cursor-pointer"
                  onClick={() => {
                    setCurrentForm(forms[0].value);
                    setIsFormSubmitted(false);
                  }}
                >
                  Fill Out Another Form
                </Button>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <select
                  className="w-fit bg-white text-lg rounded-lg p-1 outline-0 shadow"
                  onChange={(si) => {
                    const value = si.target.value;
                    setCurrentForm(value);
                  }}
                >
                  {forms.map((f, id) => {
                    return (
                      <option value={f.value} key={f.value + `${id}`}>
                        {f.friendly}
                      </option>
                    );
                  })}
                </select>
                <p className="text-md text-black/80 px-2 ">Select a form</p>
              </div>

              <motion.div
                key={currentForm}
                initial="init"
                animate="view"
                variants={containerVariant}
              >
                {forms.find((f) => f.value === currentForm)?.content}
              </motion.div>
            </>
          )}
        </motion.div>
      </PaddedContainer>
    </div>
  );
};

/// Create a page property based on the Contact element.
export const ConsentFormsPage: Page = {
  element: <ConsentForms />,
  title: "Consent Forms",
  path: "/consent-form",
};
