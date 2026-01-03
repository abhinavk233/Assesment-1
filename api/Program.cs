
namespace AvalphaTechnologies.CommissionCalculator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //cors related policy
            builder.services.AddCors(options=>{
                options.AddPolicy("AllowReact",
                policy=>{
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                })
            });

            app.UseHttpsRedirection();
            app.UseCors("AllowReact");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
