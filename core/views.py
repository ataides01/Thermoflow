from django.shortcuts import render


PRODUCTS = [
    {"name": "Mangueira aquecida", "tag": "Processos com fluido"},
    {"name": "Manta termica", "tag": "Isolamento industrial"},
    {"name": "Traco eletrico", "tag": "Aquecimento controlado"},
    {"name": "Caixa de ligacao", "tag": "Infraestrutura eletrica"},
]

SOLUTIONS = [
    "Traco eletrico para tubulacoes, tanques e equipamentos",
    "Mantas termicas e isolamento removivel sob medida",
    "Automacao, controle termico e eficiencia energetica",
    "Projetos, supervisao, comissionamento e manutencao",
]


def base_context(active_page):
    return {
        "active_page": active_page,
        "products": PRODUCTS,
        "solutions": SOLUTIONS,
        "contact_email": "vendas@thermoflow.com.br",
        "contact_phone": "+55 (21) 3628-0054",
    }


def home(request):
    return render(request, "core/home.html", base_context("home"))


def about(request):
    return render(request, "core/about.html", base_context("about"))
