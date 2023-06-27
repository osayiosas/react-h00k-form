import { useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    faceboo: string;
  };
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Osayi",
      email: "",
      channel: "",

      social: {
        twitter: "",
        faceboo: "",
      },
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("form Submitted", data);
  };

  renderCount++;

  return (
    <div>
      <h2>YouTube Form ({renderCount / 2})</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username"> Username </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          />

          <p className="error">{errors.username?.message}</p>
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+ @[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/,
                message: "Invalid email format",
              },

              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "this domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "channel is reguired",
              },
            })}
          />

          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Twitter is reguired",
              },
            })}
          />

          <p className="error">{errors.social?.message}</p>

          <button className="form-control">Submit</button>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  );
};
